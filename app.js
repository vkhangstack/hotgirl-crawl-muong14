//Khai báo module muốn sử dụng
const puppeteer = require('puppeteer');
const download = require('image-downloader');
//Non-blocking
(async () => {
    const browser = await puppeteer.launch();
    console.log('Browser started');
    const page = await browser.newPage();
    const url = 'http://kenh14.vn/ai-roi-cung-khac-cac-hot-girl-nay-cung-khong-ngoai-le-khi-vong-1-cu-ngay-cang-phong-phao-20171207193958533.chn';
    await page.goto(url);
    console.log('Page loaded');
    let imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.sp-img-zoom > img, .sp-img-lightbox > img, .detail-img-lightbox > img');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải ảnh về thư mục images
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: './images'
    })));
    await browser.close();
})();