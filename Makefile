jslint:
	jslint *.js gaddag/*.js --terse --indent=2 --nomen --plusplus

deploy:
	git checkout gh-pages
	git merge master
	git push
	git checkout master
