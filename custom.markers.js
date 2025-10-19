/*

This is a JavaScript file you can edit to add custom markers to the map.
uNmINeD does not overwrite this file during map generation.

Steps:

    1. Edit this file using Notepad or a code editor (do not use document editors like Microsoft Word)
    2. Change the line "isEnabled: false," to "isEnabled: true," to display the markers
    3. Change or remove the example markers
    4. Add your own markers

Marker format:

    {
        x: X coordinate of the marker (in Minecraft block units),
        z: Z coordinate of the marker (in Minecraft block units),
        image: marker image URL to display (in quotes),
        imageScale: scale of the image (e.g. 1 = display full size, 0.5 = display half size),
        imageAnchor: [0.5, 1] means the tip of the pin is at the center-bottom of the image (see OpenLayers documentation for more info),
        text: marker text do display (in quotes),
        textColor: text color in HTML/CSS format (in quotes),
        offsetX: horizontal pixel offset of the text,
        offsetY: vertical pixel offset of the text,
        font: text font in HTML/CSS format (in quotes),
    },

Things to keep in mind:

* There are opening and closing brackets for each marker "{" and "}"
* Property names are case sensitive (i.e. "textColor" is okay, "TextColor" is not)
* There is a comma (",") at the end of each line except the opening brackets ("{")

You can use https://mapmarker.io/editor to generate custom pin images.
Use the imageScale property if the pin image is too large.

*/
var line1Color = "#253B94";
var line2Color = "#3AB449";
var line3Color = "#dc5700";
var line4Color = "#1b91bf";

var cultureColor = "#BD91BD";
var heritageColor = "#A2895F";
var hospitalColor = "#FBCECE";
var hotelColor = "#D6C8FF";
var houseColor = "#D9BC98";
var natureColor = "#C5FFAC";
var restaurantColor = "#FFC36F";
var sportColor = "#CDFDFD";
var universityColor = "#8CCFF9";

// 카테고리별 기본 스타일 프리셋
var markerPresets = {
    nature: {
        image: "pinImages/mountain.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: natureColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    park: {
        image: "pinImages/park.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: natureColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    restaurant: {
        image: "pinImages/restaurant.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: restaurantColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    fastfood: {
        image: "pinImages/fastfood.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: restaurantColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    bakery: {
        image: "pinImages/bakery.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: restaurantColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    cafe: {
        image: "pinImages/cafe.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: restaurantColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    building: {
        image: "pinImages/building.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "#B0B0B0",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    culture: {
        image: "pinImages/culture.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: cultureColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    shopping: {
        image: "pinImages/shopping.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "#FFD700",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    port: {
        image: "pinImages/port.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    government: {
        image: "pinImages/government.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    hospital: {
        image: "pinImages/hospital.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: hospitalColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    heritage: {
        image: "pinImages/heritage.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: heritageColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    hotel: {
        image: "pinImages/hotel.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: hotelColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    house: {
        image: "pinImages/house.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: houseColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    sport: {
        image: "pinImages/sport.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: sportColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    university: {
        image: "pinImages/university.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: universityColor,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    line0: {
        image: "pinImages/line0.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    line1: {
        image: "pinImages/line1.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: line1Color,
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    line2: {
        image: "pinImages/line2.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: line2Color,
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    line3: {
        image: "pinImages/line3.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: line3Color,
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    line4: {
        image: "pinImages/line4.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: line4Color,
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    subway: {
        image: "pinImages/subway.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    normal: {
        image: "pinImages/normal.pin.svg",
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 15px Calibri,sans serif"
    },
    district: {
        // 이미지 없음 (행정구역)
        imageAnchor: [0.5, 0.5],
        imageScale: 0.05,
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 3,
        offsetX: 0,
        offsetY: 20,
        font: "bold 20px Calibri,sans serif"
    },
    annex: {
        // 이미지 없음 (부속건물)
        textColor: "white",
        textStrokeColor: "black",
        textStrokeWidth: 2,
        offsetX: 0,
        offsetY: 0,
        font: "bold 12px Calibri,sans serif"
    }
};

// 마커 생성 헬퍼 함수
function createMarker(preset, customProps) {
    return Object.assign({}, markerPresets[preset] || {}, customProps);
}

UnminedCustomMarkers = {

    isEnabled: true,

    markers: [
        createMarker('normal', {
            x: -215,
            z: 1813,
            text: "강남민강공원",
            minZoom: 6,
            maxZoom: 8
        }),
        createMarker('house', {
            x: -338,
            z: 1899,
            text: "강남빌라",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('line4', {
            x: -391,
            z: 1859,
            text: "강남역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 868,
            z: -8,
            text: "강동문",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: 1500,
            z: 300,
            text: "강설부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 15,
            z: 110,
            text: "건원릉",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('university', {
            x: 269,
            z: -143,
            text: "건축대학",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('normal', {
            x: -318,
            z: -264,
            text: "건축부",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('university', {
            x: -953,
            z: 87,
            text: "경용대학교",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('normal', {
            x: 60,
            z: 595,
            text: "고등법원",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('university', {
            x: 303,
            z: -370,
            text: "공과대학",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('university', {
            x: 938,
            z: -438,
            text: "공군사관학교",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('line2', {
            x: 925,
            z: -496,
            text: "공사역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line2Color,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -21,
            z: -154,
            text: "과학연구센터",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: -1300,
            z: -1900,
            text: "광평동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line3', {
            x: -1055,
            z: -1944,
            text: "광평역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('district', {
            x: -2350,
            z: -1000,
            text: "광호면",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -9,
            z: -106,
            text: "구공학관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('house', {
            x: 1126,
            z: 1046,
            text: "구룡성채",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('district', {
            x: 197,
            z: 3169,
            text: "구포동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line1', {
            x: 197,
            z: 2894,
            text: "구포역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line1Color,
            textColor: "white"
        }),
        createMarker('culture', {
            x: -237,
            z: -372,
            text: "국립극장",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: cultureColor
        }),
        createMarker('culture', {
            x: -573,
            z: -372,
            text: "국립박물관",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: cultureColor
        }),
        createMarker('normal', {
            x: -153,
            z: 288,
            text: "국방부",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: -731,
            z: -383,
            text: "국제금융센터",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('shopping', {
            x: 2146,
            z: 1204,
            text: "그긴거백화점",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('building', {
            x: -931,
            z: -574,
            text: "근대",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: -533,
            z: -257,
            text: "근대자동차",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1279,
            z: 1171,
            text: "근대자동차공장",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('house', {
            x: -215,
            z: 1450,
            text: "금성루 남해",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('building', {
            x: -254,
            z: -205,
            text: "금융공유오피스",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 3500,
            z: -1500,
            text: "금청부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('restaurant', {
            x: 315,
            z: 74,
            text: "김밥제국",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('line2', {
            x: -1800,
            z: -499,
            text: "나루역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line2Color,
            textColor: "white"
        }),
        createMarker('house', {
            x: 423,
            z: 1275,
            text: "나성 청해",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('line3', {
            x: -1000,
            z: 2600,
            text: "남곡대역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('building', {
            x: -906,
            z: -769,
            text: "남해건설",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 197,
            z: 1834,
            text: "남해대교",
            minZoom: 7,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: -84,
            z: 1068,
            text: "남해동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('port', {
            x: 280,
            z: 1584,
            text: "남해여객터미널",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line0', {
            x: 197,
            z: 1200,
            text: "남해역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line4', {
            x: 197,
            z: 1217,
            text: "남해역",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('house', {
            x: -474,
            z: 1279,
            text: "너울채",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('annex', {
            x: 66,
            z: -158,
            text: "노천극장",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('hotel', {
            x: 262,
            z: 1256,
            text: "능하 호텔",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: hotelColor
        }),
        createMarker('building', {
            x: -252,
            z: -170,
            text: "달태제과",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -102,
            z: -321,
            text: "대운동장",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('restaurant', {
            x: -84,
            z: 45,
            text: "대학포차",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('annex', {
            x: 197,
            z: -85,
            text: "대한문",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('restaurant', {
            x: 136,
            z: 81,
            text: "던킹도너츠",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('heritage', {
            x: -721,
            z: 388,
            text: "도민궁",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('building', {
            x: 1279,
            z: 1249,
            text: "도요새공장",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -483,
            z: 392,
            text: "돈화문",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: 200,
            z: -580,
            text: "동림동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 1000,
            z: -3000,
            text: "동명부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('bakery', {
            x: 235,
            z: 290,
            text: "런던바게트",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('building', {
            x: 378,
            z: 36,
            text: "레드스톤 지식산업센터",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('house', {
            x: 76,
            z: 1267,
            text: "레켄스 포레",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('building', {
            x: -33,
            z: 1277,
            text: "레켄스 타워",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 2518,
            z: -2096,
            text: "리퍼블릭오브수민",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 144,
            z: -114,
            text: "마법사의 집",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('building', {
            x: -467,
            z: -264,
            text: "마크타임즈",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('restaurant', {
            x: 138,
            z: 121,
            text: "명량한 핫도그",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('heritage', {
            x: 197,
            z: -1200,
            text: "명륜당",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: -3500,
            z: -2400,
            text: "모원면",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 360,
            z: -129,
            text: "묵정지",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: 1945,
            z: 3472,
            text: "미곡동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 1700,
            z: -1800,
            text: "미수부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 2300,
            z: -2000,
            text: "미지정",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: -118,
            z: 1670,
            text: "민강",
            minZoom: 6,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 2248,
            z: -2361,
            text: "바다신전",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: -150,
            z: -2300,
            text: "백암동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: -1236,
            z: -326,
            text: "백의문",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('culture', {
            x: -508,
            z: 173,
            text: "밸로보그극장",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: cultureColor
        }),
        createMarker('fastfood', {
            x: 157,
            z: 39,
            text: "버거황",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('building', {
            x: 2120,
            z: 1457,
            text: "버크셔경용웨이",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 85,
            z: 17,
            text: "보신각",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: -2100,
            z: 1600,
            text: "봉탄동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line2', {
            x: -2600,
            z: -499,
            text: "북위역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line2Color,
            textColor: "white"
        }),
        createMarker('district', {
            x: -650,
            z: -850,
            text: "북연동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('government', {
            x: -320,
            z: -134,
            text: "북연동 주민센터",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line1', {
            x: -391,
            z: -1000,
            text: "북연역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line1Color,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: -1620,
            z: 293,
            text: "비궁",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('nature', {
            x: 967,
            z: 321,
            text: "빙산",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('line3', {
            x: -2900,
            z: 2600,
            text: "사안역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 441,
            z: 193,
            text: "사직단",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('annex', {
            x: 441,
            z: 25,
            text: "사직단 정문",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('nature', {
            x: 1117,
            z: -1107,
            text: "삼수",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('heritage', {
            x: 1193,
            z: -8,
            text: "서래타워",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('line4', {
            x: -2570,
            z: 1365,
            text: "서산역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('nature', {
            x: -1206,
            z: 288,
            text: "서악산",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('house', {
            x: -703,
            z: 1280,
            text: "선세계 남해",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('district', {
            x: -1400,
            z: 3600,
            text: "성남구",
            minZoom: 3,
            maxZoom: 4,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: -400,
            z: 100,
            text: "성내구",
            minZoom: 3,
            maxZoom: 4,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 71,
            z: 486,
            text: "성내중앙지방검찰청",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 1271,
            z: 301,
            text: "성동경찰청",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 1915,
            z: 106,
            text: "성동구",
            minZoom: 3,
            maxZoom: 4,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 2161,
            z: -2166,
            text: "성동구의회",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('government', {
            x: 1769,
            z: 1114,
            text: "성동구청",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('sport', {
            x: 1987,
            z: 1181,
            text: "성동성경기장",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: sportColor
        }),
        createMarker('house', {
            x: 1119,
            z: 941,
            text: "성동시민아파트",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('district', {
            x: -800,
            z: -3100,
            text: "성북구",
            minZoom: 3,
            maxZoom: 4,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: -3000,
            z: -700,
            text: "성서구",
            minZoom: 3,
            maxZoom: 4,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 1300,
            z: 1300,
            text: "성호부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line4', {
            x: 1322,
            z: 1200,
            text: "성호역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('building', {
            x: -734,
            z: -247,
            text: "세이버",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: -734,
            z: -168,
            text: "세이버 제2사옥",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: 38,
            z: 925,
            text: "소담동",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 363,
            z: -1023,
            text: "송학지",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('building', {
            x: -1045,
            z: -260,
            text: "수경",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('house', {
            x: -752,
            z: 1100,
            text: "수려풍경 레이크",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('normal', {
            x: 117,
            z: 551,
            text: "수민고등검찰청",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 197,
            z: -1118,
            text: "수민관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('university', {
            x: 197,
            z: -1079,
            text: "수민대학교",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('hospital', {
            x: -163,
            z: -97,
            text: "수민대학교병원",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: hospitalColor
        }),
        createMarker('park', {
            x: 348,
            z: 1331,
            text: "수민숲",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('building', {
            x: -330,
            z: -190,
            text: "수민은행",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1249,
            z: 1101,
            text: "수민전력공사",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1920,
            z: 971,
            text: "수민주택공사",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 1196,
            z: -233,
            text: "수민총독부",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: -297,
            z: 609,
            text: "수민특별시",
            minZoom: 0,
            maxZoom: 2,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: -298,
            z: 611,
            text: "수민특별시의회",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('government', {
            x: -268,
            z: 493,
            text: "수민특별시청",
            minZoom: 4,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('cafe', {
            x: 318,
            z: 23,
            text: "스타벅스",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('district', {
            x: 0,
            z: 250,
            text: "시작동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('government', {
            x: 44,
            z: 7,
            text: "시작동 주민센터",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line0', {
            x: 197,
            z: -17,
            text: "시작역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('house', {
            x: 154,
            z: 246,
            text: "시작오피스텔",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('line0', {
            x: 1296,
            z: -8,
            text: "신설산역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('shopping', {
            x: -338,
            z: 55,
            text: "신코아백화점",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('house', {
            x: -71,
            z: 2045,
            text: "아지르다이 힐스",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('normal', {
            x: -311,
            z: 293,
            text: "안전부",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('nature', {
            x: -600,
            z: 2150,
            text: "암산",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('line3', {
            x: -391,
            z: 2267,
            text: "암산역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -92,
            z: -176,
            text: "약학관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -549,
            z: -12,
            text: "연시천",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -255,
            z: -46,
            text: "연시천",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('line1', {
            x: -200,
            z: -54,
            text: "연신역",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line1Color,
            textColor: "white"
        }),
        createMarker('district', {
            x: 800,
            z: -2000,
            text: "연월부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line3', {
            x: -2100,
            z: 2600,
            text: "연평역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('district', {
            x: -2500,
            z: 3000,
            text: "연해동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line4', {
            x: -2300,
            z: 3000,
            text: "연해역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('house', {
            x: 158,
            z: 168,
            text: "연희오피스텔",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('heritage', {
            x: 565,
            z: -204,
            text: "영릉",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('cafe', {
            x: 237,
            z: 23,
            text: "올리브제로",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('normal', {
            x: -83,
            z: 602,
            text: "외교부",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 1195,
            z: 353,
            text: "우정국",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 2612,
            z: -1973,
            text: "위령사",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('building', {
            x: -487,
            z: -141,
            text: "은성",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: -917,
            z: -396,
            text: "은하은행",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -108,
            z: -100,
            text: "의학관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 286,
            z: -231,
            text: "이학관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('university', {
            x: 287,
            z: -247,
            text: "자연과학대학",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('normal', {
            x: -128,
            z: 528,
            text: "정부청사본관",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: -90,
            z: 385,
            text: "정부청사단지",
            minZoom: 7,
            maxZoom: 8,
            textColor: "white"
        }),
        createMarker('building', {
            x: 2319,
            z: 1300,
            text: "정표모건빌딩",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('fastfood', {
            x: 237,
            z: 358,
            text: "조테리아",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('building', {
            x: -1010,
            z: -383,
            text: "조테",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 425,
            z: 594,
            text: "종묘",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('line1', {
            x: 197,
            z: 390,
            text: "종묘역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line1Color,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1940,
            z: 1367,
            text: "중국은행",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('district', {
            x: -1200,
            z: 250,
            text: "중명동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 197,
            z: -1017,
            text: "중명전",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('building', {
            x: -758,
            z: -447,
            text: "중소기업센터",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('university', {
            x: 51,
            z: -206,
            text: "중앙도서관",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('line0', {
            x: -391,
            z: -496,
            text: "중앙역",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line3', {
            x: -391,
            z: -458,
            text: "중앙역",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line3Color,
            textColor: "white"
        }),
        createMarker('house', {
            x: -252,
            z: -257,
            text: "중앙오피스텔",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('annex', {
            x: -524,
            z: 1118,
            text: "지석호",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('line4', {
            x: -391,
            z: 1200,
            text: "지수역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('line4', {
            x: -391,
            z: 1217,
            text: "지수역",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -531,
            z: 771,
            text: "지수호",
            minZoom: 6,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('university', {
            x: 1103,
            z: 469,
            text: "진리극지연구소",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('university', {
            x: 1278,
            z: 456,
            text: "진리지질연구소",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('university', {
            x: 1452,
            z: 810,
            text: "진리천문연구소",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: universityColor
        }),
        createMarker('annex', {
            x: -393,
            z: 1677,
            text: "진해대교",
            minZoom: 7,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: -3500,
            z: -300,
            text: "창림면",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: 2505,
            z: -908,
            text: "천관공항",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('annex', {
            x: -718,
            z: 20,
            text: "천수호",
            minZoom: 6,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: 2400,
            z: -600,
            text: "천풍부",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 1881,
            z: -1090,
            text: "천풍한옥마을",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: -74,
            z: -282,
            text: "청림동",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('normal', {
            x: -1300,
            z: 1000,
            text: "청와당(국회)",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 653,
            z: -8,
            text: "청인문",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('port', {
            x: 2307,
            z: 1540,
            text: "청해여객터미널",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('port', {
            x: 857,
            z: 1087,
            text: "청해항",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 316,
            z: -78,
            text: "춘건루",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('building', {
            x: -723,
            z: -752,
            text: "칠성",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 309,
            z: 359,
            text: "칠성스토어",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('hotel', {
            x: 142,
            z: 853,
            text: "콘래드호텔",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: hotelColor
        }),
        createMarker('house', {
            x: -235,
            z: 1280,
            text: "크리뉴 포레",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('house', {
            x: 44,
            z: 1447,
            text: "탑궁",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: houseColor
        }),
        createMarker('building', {
            x: 146,
            z: 1094,
            text: "파인애플스토어",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('hotel', {
            x: -723,
            z: -576,
            text: "플라자 호텔",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: hotelColor
        }),
        createMarker('annex', {
            x: 47,
            z: -311,
            text: "학생회관",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('district', {
            x: -2489,
            z: -2048,
            text: "화릉동",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('nature', {
            x: 1794,
            z: 839,
            text: "화악산",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('district', {
            x: -2300,
            z: -2300,
            text: "화양동",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('restaurant', {
            x: -326,
            z: 5,
            text: "황금고깃집",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05
        }),
        createMarker('heritage', {
            x: -813,
            z: 390,
            text: "황신문",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('heritage', {
            x: 639,
            z: -271,
            text: "현릉",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('heritage', {
            x: 58,
            z: -1237,
            text: "현정릉",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('heritage', {
            x: -296,
            z: -1801,
            text: "현지문",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('heritage', {
            x: 2363,
            z: -1973,
            text: "현충원",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('district', {
            x: 2212,
            z: 1068,
            text: "호반정",
            minZoom: 4,
            maxZoom: 6,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('line4', {
            x: 2077,
            z: 1200,
            text: "호반역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line4Color,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 197,
            z: 690,
            text: "홍례문",
            minZoom: 5,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('line1', {
            x: 197,
            z: 796,
            text: "홍례문역",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textStrokeColor: line1Color,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: 303,
            z: 142,
            text: "환구단",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('annex', {
            x: 231,
            z: 142,
            text: "환구단 정문",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('annex', {
            x: 370,
            z: 142,
            text: "황궁우",
            minZoom: 8,
            maxZoom: 8,
            offsetY: 0,
            textColor: "white"
        }),
        createMarker('heritage', {
            x: -920,
            z: -225,
            text: "희림사",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: heritageColor
        }),
        createMarker('building', {
            x: 2119,
            z: 1382,
            text: "ABC건설",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('cafe', {
            x: 237,
            z: 72,
            text: "catdog애견애묘",
            minZoom: 8,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: restaurantColor
        }),
        createMarker('building', {
            x: 2183,
            z: 1457,
            text: "EIFC",
            minZoom: 6,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: -249,
            z: -116,
            text: "CN건설",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1271,
            z: 231,
            text: "EES",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1194,
            z: 268,
            text: "HBC",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 2037,
            z: 1478,
            text: "HSBD",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 1865,
            z: 1037,
            text: "KY건설",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
        createMarker('building', {
            x: 139,
            z: 322,
            text: "M&M로펌",
            minZoom: 7,
            maxZoom: 8,
            imageScale: 0.05,
            textColor: "white"
        }),
]
}