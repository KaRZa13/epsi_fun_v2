export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.KITTY_API_KEY
  const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10'

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'image : ${response.statusText}`)
    }

    const data = await response.json()
    console.log("🚀 ~ defineEventHandler ~ data:", data)
    return data 
  } catch (error) {
    console.error(error)
    return { error: 'Impossible de récupérer l\'image de chat.' };
  }
})