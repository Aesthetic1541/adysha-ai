// Lightweight scroll-reveal directive: v-reveal="delayInMs"
// Adds `.reveal` styling hooks (see main.css) and flips `.is-visible`
// on once an element crosses into the viewport, then stops observing.

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      )
    : null

export const revealDirective = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (observer) observer.observe(el)
    else el.classList.add('is-visible') // no IO support: show immediately
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}
