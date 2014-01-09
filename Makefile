
all:
	zip -r dist/package.zip src/css src/img src/js src/index.html src/manifest.webapp
	cp src/package.manifest dist/package.manifest
	cp src/outer-index.html dist/index.html

clean:
	rm -r dist
	mkdir dist