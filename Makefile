.DEFAULT_GOAL := all

define copyfile
	@echo robocopy $(1) $(2) $(3)
	@(robocopy $(1) $(2) $(3) > nul) ^& IF %ERRORLEVEL% LSS 8 SET ERRORLEVEL = 0
endef

define copydir
	@echo robocopy $(1) $(2)
	@(robocopy $(1) $(2) > nul) ^& IF %ERRORLEVEL% LSS 8 SET ERRORLEVEL = 0
endef

define DIR_GUARD
	@if not exist docs mkdir docs
	@if not exist build mkdir build
endef

ALL_STATICS=docs/index.html docs/index.css docs/index.js docs/favicon.png
ALL_MODULES=build/__target__/index.js build/__target__/org.transcrypt.__runtime__.js \
 build/__target__/math.js build/__target__/random.js
ALL_RESOURCE_DIRS=docs/SoundClips

build/index.py : src/index.py
	$(DIR_GUARD)
	python build-tools/add_resource_dictionary.py $< $@

build/__target__/index.js : build/index.py
	$(DIR_GUARD)
	cd $(dir $<) && transcrypt $(notdir $<)

build/index.js  : $(ALL_MODULES)
	$(DIR_GUARD)
	java -jar build-tools/closure-compiler.jar -W QUIET --rewrite_polyfills 0 --isolation_mode IIFE $^ --js_output_file $@

docs/index.html  : src/index.html
docs/index.css   : src/index.css
docs/index.js    : build/index.js
docs/favicon.png : rsrc/favicon.png
$(ALL_STATICS)  :
	$(DIR_GUARD)
	$(call copyfile, $(dir $<) $(dir $@) $(notdir $@))

docs/SoundClips  : rsrc/SoundClips
$(ALL_RESOURCE_DIRS) :
	$(DIR_GUARD)
	$(call copydir, $< $@)

.PHONY : all
all : $(ALL_STATICS) $(ALL_RESOURCE_DIRS)

.PHONY : clean
clean :
	rd /q /s build