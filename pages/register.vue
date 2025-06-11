<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1 font-medium">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block mb-1 font-medium">Confirmer le mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <p v-if="errorMsg" class="text-red-500 mb-4 text-sm">{{ errorMsg }}</p>
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const errorMsg = ref<string>('')

const client = useSupabaseClient()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMsg.value = error.message
  } else {
    errorMsg.value = ''
    console.log('Utilisateur inscrit:', data)
  }
}
</script>
