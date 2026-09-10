import React, { useState, useEffect } from 'react';
import type { RowValues, PlaceValue, OperationMode, ViewTab, BoardOrientation, ThemeMode } from './types';
import { Header } from './components/Header';
import { PipetteTray } from './components/PipetteTray';
import { BoardMatrix } from './components/BoardMatrix';
import { ProofModal } from './components/ProofModal';
import { LearningObjectives } from './components/LearningObjectives';
import { PlaceValueConcept } from './components/PlaceValueConcept';
import { IntroPage } from './components/IntroPage';
import { KeteranganPage } from './components/KeteranganPage';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  // Default initial pocket straw values: 0
  const [row1, setRow1] = useState<RowValues>({ ratusan: 0, puluhan: 0, satuan: 0 });
  const [row2, setRow2] = useState<RowValues>({ ratusan: 0, puluhan: 0, satuan: 0 });
  const [result, setResult] = useState<RowValues>({ ratusan: 0, puluhan: 0, satuan: 0 });

  // Separate problem question inputs (typing doesn't auto-fill straws)
  const [problem1, setProblem1] = useState<number>(0);
  const [problem2, setProblem2] = useState<number>(0);

  const [operation, setOperation] = useState<OperationMode>('subtraction');
  const [orientation, setOrientation] = useState<BoardOrientation>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return 'landscape';
    }
    return 'portrait';
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digijurang_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  const [hasMerged, setHasMerged] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<ViewTab>('intro');

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  const isDark = themeMode === 'dark';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('digijurang_theme', themeMode);
    }
  }, [themeMode]);

  const handleToggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    sound.playSparkle();
  };

  const handleToggleOrientation = () => {
    const next = orientation === 'landscape' ? 'portrait' : 'landscape';
    setOrientation(next);
    sound.playSparkle();
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.soundEnabled = next;
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    sound.voiceEnabled = next;
  };

  const handleAddFromTray = (targetRow: 1 | 2, type: PlaceValue, amount = 1) => {
    if (targetRow === 1) {
      setRow1((prev) => ({
        ...prev,
        [type]: Math.min(prev[type] + amount, 30)
      }));
    } else {
      setRow2((prev) => ({
        ...prev,
        [type]: Math.min(prev[type] + amount, 30)
      }));
    }
    if (hasMerged) {
      setHasMerged(false);
    }
  };

  const handleUpdateValue = (row: 1 | 2, type: PlaceValue, delta: number) => {
    if (row === 1) {
      setRow1((prev) => ({
        ...prev,
        [type]: Math.max(0, Math.min(prev[type] + delta, 30))
      }));
    } else {
      setRow2((prev) => ({
        ...prev,
        [type]: Math.max(0, Math.min(prev[type] + delta, 30))
      }));
    }
    if (hasMerged) {
      setHasMerged(false);
    }
  };

  // Updates problem question numbers only (does NOT auto-fill pocket straws)
  const handleUpdateProblem = (row: 1 | 2, num: number) => {
    const safeNum = Math.max(0, Math.min(num, 999));
    if (row === 1) {
      setProblem1(safeNum);
    } else {
      setProblem2(safeNum);
    }
    if (hasMerged) {
      setHasMerged(false);
    }
  };

  const handleBorrowSatuan = () => {
    if (row1.puluhan > 0) {
      setRow1((prev) => ({
        ...prev,
        puluhan: prev.puluhan - 1,
        satuan: prev.satuan + 10
      }));
      sound.playSparkle();
      sound.speak('Meminjam satu puluhan menjadi sepuluh satuan!');
    }
  };

  const handleBorrowPuluhan = () => {
    if (row1.ratusan > 0) {
      setRow1((prev) => ({
        ...prev,
        ratusan: prev.ratusan - 1,
        puluhan: prev.puluhan + 10
      }));
      sound.playSparkle();
      sound.speak('Meminjam satu ratusan menjadi sepuluh puluhan!');
    }
  };

  const handleMerge = () => {
    setIsSliding(true);
    sound.playSlide();

    setTimeout(() => {
      let finalR = 0;
      let finalP = 0;
      let finalS = 0;

      if (operation === 'addition') {
        const rawS = row1.satuan + row2.satuan;
        const carryToP = Math.floor(rawS / 10);
        finalS = rawS % 10;

        const rawP = row1.puluhan + row2.puluhan + carryToP;
        const carryToR = Math.floor(rawP / 10);
        finalP = rawP % 10;

        finalR = row1.ratusan + row2.ratusan + carryToR;
      } else {
        const val1 = row1.ratusan * 100 + row1.puluhan * 10 + row1.satuan;
        const val2 = row2.ratusan * 100 + row2.puluhan * 10 + row2.satuan;
        const diff = Math.max(0, val1 - val2);

        finalR = Math.floor(diff / 100);
        const rem = diff % 100;
        finalP = Math.floor(rem / 10);
        finalS = rem % 10;
      }

      setResult({
        ratusan: finalR,
        puluhan: finalP,
        satuan: finalS
      });

      setIsSliding(false);
      setHasMerged(true);
      sound.playTada();

      const totalCalculated = finalR * 100 + finalP * 10 + finalS;
      sound.speak(`Hasil perhitungan adalah ${totalCalculated}`);
    }, 900);
  };

  const handleReset = () => {
    setRow1({ ratusan: 0, puluhan: 0, satuan: 0 });
    setRow2({ ratusan: 0, puluhan: 0, satuan: 0 });
    setResult({ ratusan: 0, puluhan: 0, satuan: 0 });
    setProblem1(0);
    setProblem2(0);
    setHasMerged(false);
    setIsSliding(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col pb-16 transition-colors duration-200 ${
        isDark ? 'bg-[#121417] text-slate-100' : 'bg-[#F1F5F9] text-slate-900'
      }`}
    >
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        orientation={orientation}
        onToggleOrientation={handleToggleOrientation}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full mx-auto p-4 sm:p-6 flex flex-col gap-6 transition-all duration-300 ${
          orientation === 'landscape' ? 'max-w-[1440px]' : 'max-w-5xl'
        }`}
      >
        {currentTab === 'intro' && (
          <IntroPage
            onGoToBoard={() => setCurrentTab('board')}
            onGoToConcept={() => setCurrentTab('concept')}
            onGoToGuide={() => setCurrentTab('objectives')}
            themeMode={themeMode}
          />
        )}

        {currentTab === 'board' && (
          <div className="space-y-4">
            {/* 1. Interactive Papan Jurang Matrix (Full Focus at Top) */}
            <BoardMatrix
              problem1={problem1}
              problem2={problem2}
              row1={row1}
              row2={row2}
              result={result}
              hasMerged={hasMerged}
              isSliding={isSliding}
              operation={operation}
              orientation={orientation}
              themeMode={themeMode}
              onSetOperation={setOperation}
              onUpdateValue={handleUpdateValue}
              onMerge={handleMerge}
              onOpenProofModal={() => setIsProofModalOpen(true)}
              onReset={handleReset}
              onBorrowSatuan={handleBorrowSatuan}
              onBorrowPuluhan={handleBorrowPuluhan}
              onUpdateProblem={handleUpdateProblem}
            />

            {/* 2. Compact Floating/Docked Mini Inventory Bar */}
            <PipetteTray
              onAdd={handleAddFromTray}
              disabled={isSliding}
              orientation={orientation}
              themeMode={themeMode}
            />
          </div>
        )}

        {currentTab === 'objectives' && (
          <LearningObjectives
            onGoToBoard={() => setCurrentTab('board')}
            themeMode={themeMode}
          />
        )}

        {currentTab === 'concept' && (
          <PlaceValueConcept themeMode={themeMode} />
        )}

        {currentTab === 'keterangan' && (
          <KeteranganPage themeMode={themeMode} />
        )}
      </main>

      {/* Proof & Concrete Counting Modal */}
      <ProofModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        result={result}
        row1={row1}
        row2={row2}
        operation={operation}
        themeMode={themeMode}
      />

    </div>
  );
};

export default App;
