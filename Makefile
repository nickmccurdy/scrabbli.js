jslint:
	jslint --terse **/*.js

deploy:
	git checkout gh-pages
	git merge master
	git push
	git checkout master
