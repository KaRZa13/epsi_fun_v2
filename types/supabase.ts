export interface CounterEpsiWis {
  public: {
    Tables: {
      'counter-epsi-wis': {
        Row: {
          id: string
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

export interface Games {
  public: {
    Tables: {
      'games': {
        Row: {
          id: number
          name: string
          image: string
          slug: string
          tag: string
        }
        Insert: {
          name: string
          image: string
          slug: string
          tag: string
        }
      }
    }
  }
}