const { join } = require('path');

it('should have consistent performance', async () => {
    await expect(async () => {
        await page.goto('file://' + join(__dirname, '..', 'index.html'));
        await d3fc.waitForEmptyRedrawQueue();
        for (let i = 0; i < 6; i++) {
            await page.click('d3fc-canvas');
            await d3fc.waitForEmptyRedrawQueue();
        }
    }).toHaveConsistentPerformance();

    expect(page).not.toHaveLogs();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

it('should look good on the website!', async () => {
    await page.goto('file://' + join(__dirname, '..', 'index.html'));
    await page.screenshot({ path: join(__dirname, '..', 'screenshot.png') });
});
