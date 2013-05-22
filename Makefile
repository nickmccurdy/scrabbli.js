jslint:
	jslint --terse *.js gaddag/*.js

deploy:
	git checkout gh-pages
	git merge master
	git push
	git checkout master
