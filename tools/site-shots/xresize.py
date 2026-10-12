# DISPLAY=:97 python3 xresize.py W H — lleva las ventanas visibles de la pantalla
# virtual a WxH píxeles. Sin gestor de ventanas, la app no puede maximizarse
# ni cambiar de tamaño sola (set_size no tiene permiso en la ventana).
import ctypes
import sys

x = ctypes.CDLL("libX11.so.6")
Display = ctypes.c_void_p
Window = ctypes.c_ulong


class XWindowAttributes(ctypes.Structure):
    # Mismo orden y tipos que en <X11/Xlib.h>.
    _fields_ = [
        ("x", ctypes.c_int), ("y", ctypes.c_int),
        ("width", ctypes.c_int), ("height", ctypes.c_int),
        ("border_width", ctypes.c_int), ("depth", ctypes.c_int),
        ("visual", ctypes.c_void_p), ("root", Window),
        ("class_", ctypes.c_int), ("bit_gravity", ctypes.c_int), ("win_gravity", ctypes.c_int),
        ("backing_store", ctypes.c_int), ("backing_planes", ctypes.c_ulong), ("backing_pixel", ctypes.c_ulong),
        ("save_under", ctypes.c_int), ("colormap", ctypes.c_ulong),
        ("map_installed", ctypes.c_int), ("map_state", ctypes.c_int),
        ("all_event_masks", ctypes.c_long), ("your_event_mask", ctypes.c_long), ("do_not_propagate_mask", ctypes.c_long),
        ("override_redirect", ctypes.c_int), ("screen", ctypes.c_void_p),
    ]


IS_VIEWABLE = 2

x.XOpenDisplay.restype = Display
x.XDefaultRootWindow.argtypes = [Display]
x.XDefaultRootWindow.restype = Window
x.XQueryTree.argtypes = [Display, Window, ctypes.POINTER(Window), ctypes.POINTER(Window), ctypes.POINTER(ctypes.POINTER(Window)), ctypes.POINTER(ctypes.c_uint)]
x.XGetWindowAttributes.argtypes = [Display, Window, ctypes.POINTER(XWindowAttributes)]
x.XMoveResizeWindow.argtypes = [Display, Window, ctypes.c_int, ctypes.c_int, ctypes.c_uint, ctypes.c_uint]
x.XFree.argtypes = [ctypes.c_void_p]
x.XSync.argtypes = [Display, ctypes.c_int]
x.XCloseDisplay.argtypes = [Display]

width, height = int(sys.argv[1]), int(sys.argv[2])
display = x.XOpenDisplay(None)
if not display:
    sys.exit("no se pudo abrir el display")
root, parent = Window(), Window()
children = ctypes.POINTER(Window)()
count = ctypes.c_uint()
x.XQueryTree(display, x.XDefaultRootWindow(display), ctypes.byref(root), ctypes.byref(parent), ctypes.byref(children), ctypes.byref(count))
for i in range(count.value):
    attrs = XWindowAttributes()
    x.XGetWindowAttributes(display, children[i], ctypes.byref(attrs))
    if attrs.map_state == IS_VIEWABLE and attrs.width > 200:
        x.XMoveResizeWindow(display, children[i], 0, 0, width, height)
if children:
    x.XFree(children)
x.XSync(display, 0)
x.XCloseDisplay(display)
