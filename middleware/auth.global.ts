export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  if (!user.value && !['/login', '/register', '/forgot-password'].includes(to.path)) {
    return navigateTo('/login')
  }
})