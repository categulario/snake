
all:
	zip -r package.zip css img js index.html manifest.webapp
	cp package.manifest ../dist/package.manifest
	cp outer-index.html ../dist/index.html
	mv package.zip ../dist/

clean:
	rm -r ../dist
	mkdir ../dist