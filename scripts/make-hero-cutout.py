# Regenerates public/portfolio/story/hero/hero-yusuf-cutout.webp from the hero photo:
# a traced head outline plus colour-segmented jacket edges, feathered.
# Usage: python scripts/make-hero-cutout.py <preview-output-dir>
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
S=sys.argv[1]
im=Image.open('public/portfolio/story/hero/hero-yusuf-city.webp').convert('RGB'); W,H=im.size
poly=[(1183,85),(1207,88),(1227,98),(1240,110),(1250,127),(1252,147),(1251,170),(1248,190),(1248,203),(1252,213),(1253,227),(1250,240),
(1260,236),(1273,237),(1280,247),(1307,273),(1333,320),(1360,347),(1387,360),(1413,387),(1433,433),(1450,487),(1463,540),(1470,593),(1467,633),(1453,673),(1427,700),(1387,727),(1353,747),(1350,773),(1350,860),(1340,880),(1320,880),(1313,941),
(960,941),(967,887),(990,877),(980,860),(967,807),(947,747),(933,700),(928,647),(933,593),(953,540),(980,473),(1000,407),(1023,360),(1060,310),(1072,282),(1100,276),(1115,267),(1107,257),(1100,237),(1102,220),(1108,207),(1102,200),(1097,180),(1098,160),(1103,137),(1117,117),(1130,103),(1150,92)]
pm=Image.new('L',(W,H),0); ImageDraw.Draw(pm).polygon(poly,fill=255)
P=np.array(pm)>0
dil=np.array(pm.filter(ImageFilter.MaxFilter(13)))>0
ero=np.array(pm.filter(ImageFilter.MinFilter(41)))>0
hsv=np.array(im.convert('HSV')).astype(int); h,s,v=hsv[...,0],hsv[...,1],hsv[...,2]
rgb=np.array(im).astype(int); r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
red=(((h<9)|(h>242))&(s>130)&(v>35)) | ((r>g*1.6)&(r>b*1.6)&(r>24))
red=np.array(Image.fromarray((red*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3)))>0
yy=np.repeat(np.arange(H)[:,None],W,1)
m=np.where(yy>=262,(red&dil)|ero,P)
# pants: below the jacket hem the traced outline is the only signal
m=np.where(yy>=878,P,m)
mk=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
# keep only the largest connected blob by flood from a body seed
a=np.array(mk)>0
from collections import deque
seen=np.zeros_like(a); q=deque([(600,1200)]); seen[600,1200]=True
while q:
    y,x=q.popleft()
    for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny,nx=y+dy,x+dx
        if 0<=ny<H and 0<=nx<W and a[ny,nx] and not seen[ny,nx]:
            seen[ny,nx]=True; q.append((ny,nx))
# fill interior holes: anything not reachable from the border is foreground
bgm=np.zeros_like(seen); q=deque([(0,0)]); bgm[0,0]=True
while q:
    y,x=q.popleft()
    for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny,nx=y+dy,x+dx
        if 0<=ny<H and 0<=nx<W and not seen[ny,nx] and not bgm[ny,nx]:
            bgm[ny,nx]=True; q.append((ny,nx))
seen=~bgm
mask=Image.fromarray((seen*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.3))
rgba=im.copy(); rgba.putalpha(mask)
rgba.save('public/portfolio/story/hero/hero-yusuf-cutout.webp','WEBP',quality=88,method=6)
bg=Image.new('RGB',(W,H),(255,0,200)); bg.paste(rgba,(0,0),rgba)
bg.crop((880,60,1520,941)).save(S+'/cut_magenta.png')
bg.crop((900,250,1120,560)).resize((440,620)).save(S+'/cut_leftshoulder.png')
