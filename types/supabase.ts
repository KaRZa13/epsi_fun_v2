export interface CounterEpsiWis {
  public: {
    Tables: {
      'counter-epsi-wis': {
        Row: {
          id: string
          name: 'epsi' | 'wis'
          counter: number
        }
        Insert: {
          name: 'epsi' | 'wis'
          counter: number
        }
        Update: {
          counter?: number
        }
      }
    }
  }
}