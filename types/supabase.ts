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
  id: number
  name: string
  image: string
  slug: string
  tag: string
} 
