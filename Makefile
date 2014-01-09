
all:
	zip -r package.zip css img js index.html manifest.webapp LICENSE

clean:
	rm package.zip