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

export async function printPicture(url: string, options?: PrintImageOptions): Promise<void> {
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
    `padding: ${pt}px ${pl}px;background-image: url(${res.data});background-repeat: no-repeat;background-size: contain;background-position: center;color: transparent;font-size: ${fontSize}px;`,
  );
}
