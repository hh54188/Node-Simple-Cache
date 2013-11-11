

for (var i = 0; i < 100 * 100 * 10; i++) {
    console.log(i);
    if (i == 100 * 100) {
        process.exit();
    }
}