const puppeteer = require('puppeteer');

const codeObj = require('./code');

let loginLink = "https://www.hackerrank.com/auth/login";
let email = "vexecop263@tst999.com";
let password = "123456";
let browserOpen = puppeteer.launch({
   headless: false,
   args:["--start-maximized"],
   defaultViewport: null
})
let page;
browserOpen.then(function(browserObject) {
   let newTabOpenPromise = browserObject.newPage();
   return newTabOpenPromise;
}).then(function(newTab) {
   page = newTab;
   let hackerrankLoginPromise = page.goto(loginLink);
   return hackerrankLoginPromise;
}).then(function(){
   let emailIsEnteredPrmoise = page.type("#input-1", email, {delay: 60})
   return emailIsEnteredPrmoise;
}).then(function(){
   let passwordIsEnteredPrmoise = page.type("#input-2", password, {delay: 60})
   return passwordIsEnteredPrmoise;
}).then(function(){
   let loginClickPromise = page.click("button[data-analytics='LoginPassword']",{delay: 60});
   return loginClickPromise;
}).then(function(){
   let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
   return clickOnAlgoPromise;
}).then(function(){
   let gotoWarmUp = waitAndClick('input[value="warmup"]',page);
   return gotoWarmUp;
}).then(function(){
   let waitFor3Sec = page.waitFor(3000);
   return waitFor3Sec;
}).then(function() {
   let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay: 60});
   // let allChangesPromise = waitAndClick(".challenge-submit-btn",page);
   return allChallengesPromise;
}).then(function(questionsArr) {
   let questionWillBeSolved = questionSolver(page,questionsArr[0],codeObj.answers[0]);
   return questionWillBeSolved;
})

function waitAndClick(selector,cPage){
   return new Promise(function(resolve,reject){
      let WaitforModelPromise = cPage.waitForSelector(selector);
      WaitforModelPromise.then(function(){
         let clickModel = cPage.click(selector);
         return clickModel;
      }).then(function(){
         resolve();
      }).catch(function(err){
         reject();
      })
   })
} 
function questionSolver(page,question,answer){
   return new Promise(function(resolve,reject){
   let questionWillBeClicked = question.click();
      questionWillBeClicked.then(function(){
         let editorInFocusPromise = waitAndClick(".monaco-scrollable-element.editor-scrollable.vs",page);
         return editorInFocusPromise;
      }).then(function(){
         return waitAndClick(".ui-checkbox.theme-m",page);
      }).then(function(){
         return page.waitForSelector("textarea.custominput",page);
      })
      .then(function(){
         return page.type("textarea.custominput",answer, {delay: 10});
      }).then(function(){
         let ctrlIsPressed = page.keyboard.down("Control");
         return ctrlIsPressed;
      }).then(function(){
         let AisPressed = page.keyboard.press("A",{delay: 100})
         return AisPressed;
      }).then(function(){
         let XisPressed = page.keyboard.press("X",{delay: 100});
         return XisPressed;
      }).then(function(){
         return page.keyboard.up("Control");
      }).then(function(){
         let mainEditorInFocus = waitAndClick(".monaco-scrollable-element.editor-scrollable.vs",page)
         return mainEditorInFocus;
      }).then(function(){
         let ctrlIsPressed = page.keyboard.down("Control");
         return ctrlIsPressed;
      }).then(function(){
         return page.keyboard.press("A",{delay: 100});
      }).then(function(){
         return page.keyboard.press("V",{delay: 100});
      }).then(function(){
         return page.keyboard.up("Control");
      }).then(function(){
         let submitButtonIsPressed = waitAndClick(".hr-monaco-submit",page);
         return submitButtonIsPressed;
      }).then(function(){
         resolve();
      }).catch(function(err){
         reject(err);
      })
   })
}