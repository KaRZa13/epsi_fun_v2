<template>
  <TopbarIndex />
  <div class="flex items-center justify-center h-auto">
    <div class="bg-slate-100 p-8 rounded shadow-md w-full max-w-sm mt-20">
      <h2 class="text-2xl font-bold mb-6 text-center">Connexion</h2>
      <form @submit.prevent="signIn">
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
        <div class="mb-6">
          <label for="password" class="block mb-1 font-medium">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <p v-if="errorMsg" class="text-red-500 mb-4 text-sm">{{ errorMsg }}</p>
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-slate-100 font-bold py-2 px-4 rounded"
        >
          Se connecter
        </button>
      </form>
      <p class="mt-4 text-center">
        Pas encore de compte ? 
        <NuxtLink to="/register" class="text-blue-600 hover:underline">Inscrivez-vous</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("")
const password = ref<string>("")
const errorMsg = ref<string>("")


const client = useSupabaseClient()
const router = useRouter()

const signIn = async () => {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      errorMsg.value = error.message
    } else {
      router.push("/")
    }
  } catch (error) {
    errorMsg.value = "an error occurred during sign-in"
  }
}
</script>


