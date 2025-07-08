return {
	recipes = {
		dev = "bun dev",
		build = "docker build -t ghcr.io/07calc/me .",
		push = "docker push ghcr.io/07calc/me",
		deploy = [[
      ssh ubuntu@51.79.173.35 << 'EOF'
      sudo su
      docker pull ghcr.io/07calc/me:latest &&
      docker stop me || true &&
      docker rm me || true &&
      docker run -d --name me -p 6969:3000 ghcr.io/07calc/me:latest &&
      docker system prune -a -f
	echo "Deployment complete"
    ]],
	},
}
