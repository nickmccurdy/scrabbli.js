lint: jslint csslint

jslint:
	jslint *.js gaddag/*.js --terse --indent=2 --nomen --plusplus

csslint:
	csslint --quiet --ignore=adjoining-classes *.css

deploy:
	git checkout gh-pages
	git merge master
	git push
	git checkout master
