import { createContext, useState, useContext } from 'react';

export const BackgroundImgContext = createContext();

export const useBackgroundImgContext = () => {
    return useContext(BackgroundImgContext);
}

const backgroundUrlPicker = () => {
    const imgArray = ["https://static.wikia.nocookie.net/spongebob/images/2/26/Bubbletown_002.png",
    "https://wallpapers.com/images/featured/spring-flowers-eoojawyepah3if12.jpg",
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg",
    "https://www.everwallpaper.co.uk/cdn/shop/collections/marble-geometry-wallpaper-mural.jpg",
    "https://img.freepik.com/premium-photo/wallpaper-tropical-plant-with-green-leaves_148840-1679.jpg",
    "https://c0.wallpaperflare.com/preview/652/943/804/close-up-fresh-freshness-garden.jpg"
    ];
    const index = Math.floor(Math.random() * imgArray.length);
    return imgArray[index];

}
export default function BackgroundImgProvider(props) {
    const [backgroundImg, setBackgroundImg] = useState(backgroundUrlPicker());

    return (
        <BackgroundImgContext.Provider
          value={{
            backgroundImg,
            setBackgroundImg
          }}
        >
          {props.children}
        </BackgroundImgContext.Provider>
    )
}
