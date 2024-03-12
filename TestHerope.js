const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');  

describe('Validate notes', function() {
  let driver;

  before(async function() {
    // Configuração do WebDriver
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize(); // Maximiza a janela do navegador
  });

  it('Create new Note', async function() {
    // Abrir a página inicial
    await driver.get('https://quicknote.io/mynotes');
    console.log("Home page loaded successfully.");

    //clicar em nova nota"
    await driver.findElement(By.css('a.btn:nth-child(1)')).click();
    console.log("'New Note' button clicked successfully.");

    //Digitar o título da nota
    await driver.findElement(By.css('.title > input:nth-child(1)')).sendKeys('Teste 1');
    console.log("Note title entered successfully.");

    //Digitar mensagem da nota
    await driver.findElement(By.xpath('/html/body/div/div/div[1]/form/div[3]/div/trix-editor')).sendKeys('Cenário de teste 1');
    console.log("Note message entered successfully.");

    //Publica nota
    await driver.findElement(By.css('#root > div > div.NewNote > form > div.buttons > div.submit > span')).click();
    console.log("Note published successfully.");

    await driver.sleep(5000);

    //Verifica se a nota foi criada
    assert.strictEqual(await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[1]/h1')).getText(), 'Teste 1');
    console.log("Note created successfully.");

    //Voltar para pág inicial
    await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[2]/a[4]')).click();
    console.log("'My notes' button clicked successfully.");
  });

  it('Edit Note', async function() {
    // Selecionar nota
    await driver.findElement(By.css('.mynotes > li:nth-child(1) > a:nth-child(2)')).click();
    console.log("Selected note");

    //Clickar em edit
    await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[2]/a[2]')).click();
    console.log("Clicked edit");

    //Editar o conteúdo da nota
    await driver.findElement(By.xpath('/html/body/div/div/div[1]/form/div[3]/div/trix-editor')).sendKeys('Nota editada   ');
    console.log('Edited note');

    //Salvar edição
    await driver.findElement(By.css('#root > div > div.NewNote > form > div.buttons > div.submit > span')).click();
    console.log('Clicou em salvar');

    await driver.sleep(5000);

    //Publica edição
    await driver.findElement(By.xpath('/html/body/div/div/div[1]/form/div[2]/div[1]/span')).click();
    console.log('publica edição');

    await driver.sleep(5000);

    //Verifica se a nota foi editada
    assert.strictEqual(await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[3]')).getText(), 'Nota editada   Cenário de teste 1');
    console.log("Note edited successfully.");


    //Voltar para pág inicial
    await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div[2]/div[2]/a[4]')).click();
    console.log("'My notes' button clicked successfully.");
  });

  it('Delete Note', async function() {
    // Clickar em excluir nota
    await driver.findElement(By.css('#root > div > div.Notes > div.body > div > ul > li:nth-child(1) > div')).click();
    console.log('Clicked delete');

    //Confirmar exclusão
    await driver.wait(until.alertIsPresent());
    // Store the alert in a variable
    let alert = await driver.switchTo().alert();
    //Store the alert text in a variable
    let alertText = await alert.getText();
    //Press the OK button
    await alert.accept();
    console.log('Confirmed deletion');
    
  });


  after(async function() {
    // Fechar o navegador após a execução dos testes
    await driver.quit();
  });
});
