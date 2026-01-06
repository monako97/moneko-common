interface ImageBBox {
  data: string;
  width: number;
  height: number;
  aspectRatio: number;
}

async function getImageBBox(dataUrl: string): Promise<ImageBBox> {
  return new Promise<ImageBBox>((resolve, reject) => {
    const img = new Image();

    img.src = dataUrl;
    // 图片跨域
    img.crossOrigin = 'Anonymous';
    // 图片加载成功
    img.onload = () => {
      resolve({
        data: img.src,
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height,
      });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
  });
}
async function parseImageUrl(url: string): Promise<ImageBBox> {
  if (url.startsWith('data:')) {
    return getImageBBox(url);
  }
  const resp = await fetch(url, {
    mode: url.startsWith('blob:') || url.startsWith('file:') ? 'same-origin' : 'cors',
  });

  if (resp.ok) {
    const blob = await resp.blob();

    return new Promise<ImageBBox>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(getImageBBox(reader.result));
        } else {
          reject(new Error('Failed to convert blob to data URL'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
  throw new Error(`Failed to fetch image: ${resp.status} ${resp.statusText}`);
}

interface PrintImageOptions {
  scale?: number;
  width?: number;
  height?: number;
  placeholder?: string;
}

async function printPicture(url: string, options?: PrintImageOptions) {
  const res = await parseImageUrl(url);
  const { scale = 1, width, height, placeholder } = options ?? {};
  let rw = res.width,
    rh = res.height;

  if (width && height) {
    rw = width * scale;
    rh = height * scale;
  } else if (width) {
    rw = width * scale;
    rh = rw / res.aspectRatio;
  } else if (height) {
    rh = height * scale;
    rw = rh * res.aspectRatio;
  }
  const alt = placeholder ?? 'Moneko';
  const fontSize = 16;
  const pt = Math.floor((rh + fontSize) / 2);
  const pl = Math.floor(rw / 2);
  // eslint-disable-next-line no-console
  const log = Function.prototype.bind.call(console.log, console);

  log(
    `%c${alt}`,
    `padding: ${pt}px ${pl}px;
    background-image: url(${res.data});background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    color: transparent;
    font-size: ${fontSize}px;`,
  );
}
printPicture('https://h5static.dewucdn.com/node-common/4eff4dcf-45bb-076d-abef-6e117f708d42.svg');
printPicture('https://h5static.dewucdn.com/node-common/75de0360-fb9b-cde5-0b4e-02b3df87915c.svg');
printPicture('https://h5static.dewucdn.com/node-common/74f91d80-c0ac-9082-b3ed-d1167c00bfe3.svg', {
  height: 50,
});
printPicture('https://h5static.dewucdn.com/node-common/de5243eb-73f7-d654-e291-6bb84eaccbbd.svg', {
  height: 50,
});
printPicture('https://h5static.dewucdn.com/node-common/af89b397-e024-ca0c-6c31-e9c73a34a1e8.svg', {
  height: 50,
});
printPicture('https://h5static.dewucdn.com/node-common/bda896b7-4b37-1298-9116-6f77b8439d1d.svg', {
  height: 50,
});
printPicture('https://h5static.dewucdn.com/node-common/2d3daa89-f124-e7d2-8381-820ca5689d36.svg', {
  height: 50,
});
printPicture('https://h5static.dewucdn.com/node-common/a25d43d9-81d7-bc22-ce3c-744ca4f04efe.svg', {
  height: 50,
});