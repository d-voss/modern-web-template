# Set default SCSS file encoding to override system default
Encoding.default_external = "utf-8"
base_dir = File.dirname(__FILE__) + '/../..'


# Global compass configuration for the default.theme
# -----
require 'autoprefixer-rails'

options = { :browsers => [ "ff >= 32", "chrome >= 32", "ie >= 10" ] }

on_stylesheet_saved do |file|
   css = File.read(file)
   File.open(file, 'w') { |io| io << AutoprefixerRails.process(css, options) }
end




# Import Path
# -----------

bower_dir = './bower_components/'
puts 'Using bower_components at ' + bower_dir

# Find Third party SCSS
# - Material Design Lite
add_import_path bower_dir + '/material-design-lite/src/'
# - Font-Awesome
add_import_path bower_dir


# Project directories
# -------------------

# Sass/Scss Directory
sass_dir = "src/scss"

# Image Directory For Sprites
sprite_load_path = [ "src" ]



# Output
# ------

css_dir = "dist/css"
images_dir = "dist/img"
fonts_dir = "dist/fonts"

# Indicates whether the compass helper functions should generate relative urls from the generated css to assets, or absolute urls using the http path for that asset type.
relative_assets = true

# CSS Output Style
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
