export type PlaceValue = 'ratusan' | 'puluhan' | 'satuan';

export interface RowValues {
  ratusan: number;
  puluhan: number;
  satuan: number;
}

export type OperationMode = 'addition' | 'subtraction';

export type ViewTab = 'intro' | 'board' | 'concept' | 'objectives' | 'keterangan';

export type BoardOrientation = 'portrait' | 'landscape';

export type ThemeMode = 'dark' | 'light';

export interface PipetteItem {
  id: string;
  valueType: PlaceValue;
  color: string;
  sourceRow: 1 | 2;
  stripeType?: number;
}

export interface QuizQuestion {
  id: string;
  level: 'Mudah (Satuan & Puluhan)' | 'Sedang (Ratusan)' | 'Tantangan (Menyimpan)';
  story: string;
  num1: number;
  num2: number;
  operation: OperationMode;
  explanation: string;
}

export interface DraggedItem {
  valueType: PlaceValue;
  count: number;
}
