=== Three Importer ===
Contributors:      Bryce Callahan
Tags:              block, shortcode, script inject
Tested up to:      6.8
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A powerfull ThreeJS WordPress plugin.

== Description ==
Three Importer (TI) is a WordPress plugin that was built with all users in mind. A custom ThreeJS scene can be fabricated by the user using either a block, shortcode, or custom script injection. This allows people with little-to-no coding experience to well-seasoned developers to create beautiful, 3D websites with full control over the scene settings.

== Installation ==
This plugin is currently under development and therefore is only available via this Github Repository.
1. Click the green "Code" button at the top-right of the repository.
2. A dropdown menu should appear, click "Download ZIP" and remember where you save the ZIP folder.
3. In your WordPress editor, click "Plugins" to view the plugins tab.
4. Click "Add Plugin" in the top-left of the plugins page.
5. Click "Upload Plugin" in the top-left of the Add Plugin page.
6. Browse and select (or drag-and-drop) the Three Importer ZIP folder into the Upload Plugin page.
7. Click "Active" and you're good to go!

== Frequently Asked Questions ==
Q: Why cant I see my Geometry? 
    A: 3 reasons can cause this: Camera Position, Geometry Position, Geometry Rotation. Make sure your camera isn't inside the mesh by adjusting the camera or geometry x/y/z position settings.  Also try rotating the object some; the Circle Geometry, for example, is so thin that if viewed from the side it appears invisible.

Q: Why is my lighting not being applied?
    A: 2 reasons can cause this: Light Position and Geometry Material. Make sure your light isn't inside your geometry, this can cause the light to not be seen. Also make sure that your geometry isn't the basic material option, which does not track light.

Q: Why do I see "WARNING: Multiple instances of Three.js being imported." in my browser's console?
    A: This warning is the byproduct of mixing the TI Block and Shortcodes. This will not break anything, but (depending on the scene) can reduce performance of your website. Please stick to either using just the Blocks or just the Shortcode on your page.

== Changelog ==
= 0.1.0 =
* Release