REPO=hub.jdcloud.com
PROJECT=mesh
IMAGE=mesh-dev-doc
VERSION=v1.0

default:
	rm -rf docs/.vuepress/dist
	npm run docs:build
	docker build -t ${REPO}/${PROJECT}/${IMAGE}:${VERSION} .
	docker push ${REPO}/${PROJECT}/${IMAGE}:${VERSION}