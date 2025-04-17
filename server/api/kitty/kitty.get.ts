export default defineEventHandler(async (): Promise<any> => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=6', {
      headers: {
        'x-api-key': process.env.CAT_API_KEY || '',
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data: unknown = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des images de chats :', error)
    return {
      error: 'Impossible de récupérer les images de chats.',
    }
  }
})