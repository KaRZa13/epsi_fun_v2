export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=6', {
      headers: {
        'x-api-key': process.env.DOG_API_KEY || '', 
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des images de chiens :', error)
    return {
      error: 'Impossible de récupérer les images de chiens.',
    }
  }
})