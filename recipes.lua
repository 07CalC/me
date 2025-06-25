return {
  recipes = {
    dev = "bun dev",
    build = "docker build -t ghcr.io/07calc/me .",
    push = "docker push ghcr.io/07calc/me",
  },
}
