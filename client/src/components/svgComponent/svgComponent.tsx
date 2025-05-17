import { useEffect, useState } from 'react';
import styles from './svgComponent.module.scss';
import type {
  Color,
  Pattern,
  Picture,
} from '../../services/api/socksApi/types';
import {
	createSock,
  getAllColors,
  getAllPatterns,
  getAllPictures,
} from '../../services/api/socksApi/socksApi';

export default function SvgComponent() {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  const [colors, setColors] = useState<Color[]>([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const [sock, setSock] = useState(null);

  async function getColors(): Promise<void> {
    const response = await getAllColors();
    setColors(response);
  }

  async function getPictures(): Promise<void> {
    const response = await getAllPictures();
    setPictures(response);
  }

  async function getPatterns(): Promise<void> {
    const response = await getAllPatterns();
    setPatterns(response);
  }

  useEffect(() => {
    getColors();
    getPictures();
    getPatterns();
  }, []);

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
  };

  const handlePictureClick = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  const handlePatternClick = (pattern: Pattern) => {
    setSelectedPattern(pattern);
	};

	const handlerButtonClear = () => {
		setSelectedColor(null);
		setSelectedPicture(null);
		setSelectedPattern(null);
	}
	

	//доделать на сервере чтобы мог быть тull или цвет какой-то по умолчанию поставить
	const onSaveSockHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!selectedColor) {
      alert('Color not selected');
      return;
    }

    const addData = {
      colorId: selectedColor?.id,
      pictureId: selectedPicture?.id,
      patternId: selectedPattern?.id
    }
    const response = await createSock(addData);

	}

  return (
    <div className={styles.socks_page}>
      <div className={styles.img_area}>
        <div className={styles.sock_wrap}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="80%"
            height="80%"
            viewBox="0 0 512 512"
            stroke="#6b7b84"
            strokeWidth="2"
            className={styles.sock}
          >
            <path
              d="M444.368 319.916c-11.69-19.637-28.937-36.436-50.694-47.679l-90.071-46.594V0H49.666v302.921c.019 47.426 26.52 90.958 68.641 112.771l158.703 82.096C295.601 507.406 315.612 512 335.258 512a127.453 127.453 0 0 0 65.167-17.966c19.646-11.69 36.444-28.928 47.687-50.693 9.628-18.592 14.221-38.602 14.221-58.248a127.4 127.4 0 0 0-17.965-65.177z"
              fill={selectedColor?.code || '#b3f9fa'}
            />

            <g data-name="Слой_2" opacity={0}>
              <ellipse fill="#009fe3" cx="151.2" cy="147.4" rx="2.8" ry="4.3" />
              <ellipse fill="#009fe3" cx="233.7" cy="80.2" rx="2.8" ry="4.3" />
              <ellipse fill="#009fe3" cx="157.3" cy="104.5" rx="4.5" ry="2.8" />
              <ellipse fill="#009fe3" cx="259.4" cy="146.5" rx="4" ry="2.5" />
              <ellipse fill="#009fe3" cx="205.7" cy="182.8" rx="2.1" ry="3.5" />
              <ellipse fill="#009fe3" cx="197.9" cy="229.8" rx="2.1" ry="3.5" />
              <ellipse fill="#009fe3" cx="150" cy="238.7" rx="3.9" ry="2.5" />
              <ellipse fill="#009fe3" cx="256.4" cy="181.7" rx="3.9" ry="2.4" />
              <ellipse fill="#009fe3" cx="228.9" cy="125.6" rx="3.9" ry="2.4" />
              <ellipse fill="#009fe3" cx="159.9" cy="291.8" rx="3.1" ry="5.2" />
              <ellipse fill="#009fe3" cx="242.4" cy="281.1" rx="2" ry="3.5" />
            </g>

            <g data-name="Слой_3" opacity={0}>
              <path
                fill="#be1622"
                d="M122.2,121.5s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M153.6,79.6s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M179.3,142.4s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M230.6,163.3s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M249.6,121.5s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M206.1,93.6s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M162.4,197.3s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M122.1,284.4s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M182.1,268s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z"
              />
              <path
                fill="#be1622"
                d="M212.8,310.3s-5-6.9-5.2-10.5.9-4.5,4.5-4,6.2,4.7,6.2,4.7c0,0,1.8-6.7,4.8-7.1s6.2,1.8,5.1,7.1c-2.1,9.7-7.2,18.4-7.2,18.4,0,0-5.8-5.4-8.1-8.5Z"
              />
              <path
                fill="#be1622"
                d="M259.5,275s-8.3-1.1-10.9-3.3-2.5-3.5.3-5.7,7.5-1.1,7.5-1.1c0,0-3.4-5.5-1.6-7.9s5.5-3.1,8.5,1.1c5.3,7.7,7.9,16.9,7.9,16.9,0,0-7.8.4-11.6,0Z"
              />
            </g>
          </svg>

          <div className={styles.pattern_wrap}>
            <img
              src="/images/patterns/pat_winter_blue.svg"
              alt="pat_winter_blue"
              className={`${styles.pattern} ${
                selectedPattern?.pattern_url === 'pat_winter_blue.svg'
                  ? styles.pictureVisible
                  : ''
              }`}
            />
            <img
              src="/images/patterns/pat_pink.svg"
              alt="pat_pink"
              className={`${styles.pattern} ${
                selectedPattern?.pattern_url === 'pat_pink.svg'
                  ? styles.pictureVisible
                  : ''
              }`}
            />
          </div>
          <div className={styles.picture_wrap}>
            <img
              src="/images/pictures/pic_winter_blue.svg"
              alt=""
              className={`${styles.picture} ${
                selectedPicture?.picture_url === 'pic_winter_blue.svg'
                  ? styles.pictureVisible
                  : ''
              }`}
            />
            <img
              src="/images/pictures/pic_paw.svg"
              alt=""
              className={`${styles.picture} ${
                selectedPicture?.picture_url === 'pic_paw.svg'
                  ? styles.pictureVisible
                  : ''
              }`}
            />
            <img
              src="/images/pictures/pic_heart_orange.svg"
              alt=""
              className={`${styles.picture} ${
                selectedPicture?.picture_url === 'pic_heart_orange.svg'
                  ? styles.pictureVisible
                  : ''
              }`}
            />
          </div>
        </div>
        <div className={styles.panel_wrap}>
          <h2>Socks</h2>

					<form onSubmit={onSaveSockHandler}>
          <h3>Color:</h3>
          <div className={styles.colorPanel}>
            {colors.map((color) => (
              <div
                key={`${color.id}c`}
                className={`${styles.colorBlock} ${
                  selectedColor?.id === color.id ? styles.selected : ''
                }`}
                style={{ backgroundColor: color.code }}
                onClick={() => handleColorClick(color)}
              />
            ))}
					</div>
					
          <h3>Picture:</h3>
          <div className={styles.picture_grid}>
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className={`${styles.picture_item} ${
                  selectedPicture?.id === picture.id ? styles.selected : ''
                }`}
                onClick={() => handlePictureClick(picture)}
              >
                <img
                  src={`/images/pictures/${picture.picture_url}`}
                  alt={picture.picture}
                />
              </div>
            ))}
          </div>

          <h3>Pattern:</h3>
          <div className={styles.picture_grid}>
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`${styles.picture_item} ${
                  selectedPattern?.id === pattern.id ? styles.selected : ''
                }`}
                onClick={() => handlePatternClick(pattern)}
              >
                <img
                  src={`/images/patterns/${pattern.pattern_url}`}
                  alt={pattern.pattern}
                />
              </div>
            ))}
						</div>
						
						<button type='button' className={styles.save_button} onClick={() => handlerButtonClear()}>Clear</button>

						<button type='submit' className={styles.save_button} >Save</button>
					</form>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className={styles.pattern_wrap}>
        <img src="/images/patterns/pat_orange.svg" alt="" className={styles.pattern} />
      </div>  
           <div className={styles.picture_wrap}>
        <img src="/images/pictures/pic_h_orange.svg" alt="" className={styles.picture}/>
      </div> */
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 400 400">
      <g>
        <g data-name="Слой_3" opacity={1}>
          <path fill="#be1622" d="M122.2,121.5s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M153.6,79.6s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M179.3,142.4s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M230.6,163.3s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M249.6,121.5s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M206.1,93.6s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M162.4,197.3s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M122.1,284.4s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M182.1,268s-7.9-5.4-9.4-9-.8-5,3.2-5.9,8.3,2.6,8.3,2.6c0,0-.7-7.7,2.4-9.3s7.2-.5,8,5.5c1.5,10.9-.6,22-.6,22,0,0-8.2-3.5-11.8-5.8Z" />
          <path fill="#be1622" d="M212.8,310.3s-5-6.9-5.2-10.5.9-4.5,4.5-4,6.2,4.7,6.2,4.7c0,0,1.8-6.7,4.8-7.1s6.2,1.8,5.1,7.1c-2.1,9.7-7.2,18.4-7.2,18.4,0,0-5.8-5.4-8.1-8.5Z" />
          <path fill="#be1622" d="M259.5,275s-8.3-1.1-10.9-3.3-2.5-3.5.3-5.7,7.5-1.1,7.5-1.1c0,0-3.4-5.5-1.6-7.9s5.5-3.1,8.5,1.1c5.3,7.7,7.9,16.9,7.9,16.9,0,0-7.8.4-11.6,0Z" />
        </g>
        <g data-name="Слой_1" stroke="#1d1d1b" strokeMiterlimit="10" fill="none">
          <path strokeWidth="8" d="M71.8,47.3L143.4,10.5c11.3-2.8,18.2,18.5,31.1,46.8,10.3,22.6,42.9,93.2,60,114.1,28.2,34.6,27.9,59.2,20.2,74.5s-35,28.4-46.3,39c-23.2,21.8-81.2,79.7-108.2,90.6s-70.6-9.9-41.8-57.8c14.9-24.9,74.4-87.9,79.8-111.8,8.4-37.2-34.5-89.2-49-111.3-1.3-2.1-16.9-21.4-22.2-34.3s.1-10.6,4.9-13.1Z" />
          <path strokeWidth="8" d="M163.1,31.7l61.4-20.3s9.9-3.2,21.9,34.6c15.9,49.8,22.7,115.5,44.7,142.2,20.1,24.4,21.9,33.9,22.3,38.8,1.8,21.2-7.7,37.7-23.7,47.2s-31.3,23.2-39.9,30.7l-60.7,60.2c-6.3,6.1-13.8,10.9-22.1,13.8-14.3,5-33.6,5.4-39.5-24.8" />
          <path strokeWidth="10" d="M351,321.9" />
          <path strokeWidth="10" d="M251.1,373.5" />
          <path strokeWidth="8" d="M70.6,300.5s68-15.1,67.7,48.9" />
          <path strokeWidth="8" d="M173.2,318.3s24.4-15.1,37.1,25.9" />
          <path strokeWidth="8" d="M291.1,188.2c-8.4,8.2-30.5,51.3-7.7,90.3" />
          <path strokeWidth="8" d="M233,169.6s-39.1,52.8-7.4,98.8" />
          <line strokeWidth="8" x1="83.6" y1="87.3" x2="167.5" y2="41.5" />
          <line strokeWidth="8" x1="248" y1="51" x2="180.5" y2="70.5" />
          <line strokeWidth="7" x1="75.3" y1="45.5" x2="95.4" y2="80.9" />
          <line strokeWidth="7" x1="88.8" y1="39.6" x2="107.8" y2="72.6" />
          <line strokeWidth="7" x1="100.8" y1="34.5" x2="119.8" y2="67.5" />
          <line strokeWidth="7" x1="114" y1="28.9" x2="132.9" y2="62" />
          <line strokeWidth="7" x1="127.7" y1="22.9" x2="146.6" y2="56" />
          <line strokeWidth="7" x1="139.1" y1="16.4" x2="158" y2="49.5" />
          <line strokeWidth="7" x1="176.8" y1="29.9" x2="190.9" y2="65.3" />
          <line strokeWidth="7" x1="188.6" y1="27.8" x2="202.7" y2="63.2" />
          <line strokeWidth="7" x1="201.7" y1="23.8" x2="215.8" y2="59.2" />
          <line strokeWidth="7" x1="216.1" y1="18.6" x2="230.2" y2="54" />
        </g>
        <g data-name="Слой_2" opacity={0}>
          <ellipse fill="#009fe3" cx="151.2" cy="147.4" rx="2.8" ry="4.3" />
          <ellipse fill="#009fe3" cx="233.7" cy="80.2" rx="2.8" ry="4.3" />
          <ellipse fill="#009fe3" cx="157.3" cy="104.5" rx="4.5" ry="2.8" />
          <ellipse fill="#009fe3" cx="259.4" cy="146.5" rx="4" ry="2.5" />
          <ellipse fill="#009fe3" cx="205.7" cy="182.8" rx="2.1" ry="3.5" />
          <ellipse fill="#009fe3" cx="197.9" cy="229.8" rx="2.1" ry="3.5" />
          <ellipse fill="#009fe3" cx="150" cy="238.7" rx="3.9" ry="2.5" />
          <ellipse fill="#009fe3" cx="256.4" cy="181.7" rx="3.9" ry="2.4" />
          <ellipse fill="#009fe3" cx="228.9" cy="125.6" rx="3.9" ry="2.4" />
          <ellipse fill="#009fe3" cx="159.9" cy="291.8" rx="3.1" ry="5.2" />
          <ellipse fill="#009fe3" cx="242.4" cy="281.1" rx="2" ry="3.5" />
        </g>
      </g>
			</svg>
			
			      <div className={styles.picture_wrap}>
        <img
          src="/images/pictures/pic_winter_blue.svg"
          alt=""
          className={styles.picture}
        />
			</div>

			 <div className={styles.picture_wrap}>
        <img src="/images/pictures/pic_h_orange.svg" alt="" className={styles.picture_orange}/>
      </div> */
}
