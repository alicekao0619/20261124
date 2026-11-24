let bgImg; // 宣告變數，用來儲存原始載入的背景圖片
let cleanBgImg; // 宣告變數，用來儲存已徹底裁除左右邊框線的純淨背景圖片
let idleSheet; // 宣告變數，用來儲存角色1的「站立」圖片精靈
let walkSheet; // 宣告變數，用來儲存角色1的「走」圖片精靈
let attackSheet; // 宣告變數，用來儲存角色1的「腿部攻擊」圖片精靈
let effectSheet; // 宣告變數，用來儲存「腿部攻擊特效」圖片精靈

const idleFrames = 8; // 設定站立動畫的總畫格數為 8 張
const idleSheetW = 707; // 設定站立圖片精靈的總寬度為 707 像素
const idleSheetH = 190; // 設定站立圖片精靈的總高度為 190 像素

const walkFrames = 9; // 設定走路動畫的總畫格數為 9 張
const walkSheetW = 1147; // 設定走路圖片精靈的總寬度為 1147 像素
const walkSheetH = 195; // 設定走路圖片精靈的總高度為 195 像素

const attackFrames = 13; // 設定腿部攻擊動畫的總畫格數為 13 張
const attackSheetW = 3024; // 設定腿部攻擊圖片精靈的總寬度為 3024 像素
const attackSheetH = 179; // 設定腿部攻擊圖片精靈的總高度為 179 像素

const effectFrames = 4; // 設定腿部攻擊特效的總畫格數為 4 張
const effectSheetW = 143; // 設定腿部攻擊特效圖片精靈的總寬度為 143 像素
const effectSheetH = 28; // 設定腿部攻擊特效圖片精靈的總高度為 28 像素

let state = 'idle'; // 記錄角色1目前的動作狀態（'idle' 站立、'walk' 走路、'attack' 腿部攻擊）
let facing = 1; // 記錄角色1目前的面向方向（1 代表面向右邊，-1 代表面向左邊）
let charCenterX; // 記錄角色1在畫布上的水平中心點 X 座標
let bgScrollX = 0; // 記錄中間背景圖片的水平偏移量（範圍為 -width 到 +width，共三張背景圖串接）
let currentFrame = 0; // 記錄目前動畫播放到的畫格索引值
let attackWavesSpawned = 0; // 記錄本次腿部攻擊期間已發射的衝擊波特效次數（每播放 4 張觸發 1 次）
let idleSpeed = 0.18; // 設定站立動作的動畫播放速度
let walkSpeed = 0.12; // 設定走路動作的動畫播放速度（約 1.25 秒播完 9 張）
let attackSpeed = 0.14; // 設定腿部攻擊的動畫播放速度（約 1.55 秒播完 13 張，與走路節奏協調一致）
let effectScale = 2.8; // 設定腿部攻擊特效的放大倍率（2.8 倍增強攻擊魄力）
let kickPeakYRatio = 0.22; // 記錄角色腿部攻擊時腳部最高處相對於畫格高度的比例（預設 0.22）
let effects = []; // 宣告陣列，用來存放目前畫面上所有正在移動的攻擊特效物件

function preload() { // p5.js 預載入函式，確保所有圖片載入完成後才執行 setup
  bgImg = loadImage('bg/0.png'); // 載入背景圖片（使用正斜線避免 \0 變成跳脫字元）
  idleSheet = loadImage('1/站立/all站立.png'); // 載入角色1站立圖片精靈檔案
  walkSheet = loadImage('1/走/all走.png'); // 載入角色1走路圖片精靈檔案
  attackSheet = loadImage('1/腿部攻擊/all腿部攻擊.png'); // 載入角色1腿部攻擊圖片精靈檔案
  effectSheet = loadImage('1/腿部攻擊 特效/all腿部攻擊特效.png'); // 載入腿部攻擊特效圖片精靈檔案
} // preload 函式結束

function setup() { // p5.js 初始化函式，網頁載入時執行一次
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗大小的全螢幕畫布
  imageMode(CORNER); // 設定圖片繪製基準點為左上角
  charCenterX = width / 2; // 初始化角色1的水平中心點在畫布正中央
  bgScrollX = 0; // 初始化背景水平偏移量為 0（顯示三張串接背景圖的中間那一張）
  buildCleanBackground(); // 建立已徹底移除左右邊框與立體外框線的純淨背景圖片
  kickPeakYRatio = detectKickPeakYRatio(); // 自動偵測腿部攻擊圖片精靈中角色腳部最高處的高度比例
} // setup 函式結束

function buildCleanBackground() { // 偵測原圖左右邊框並建立無邊框純淨背景圖層的函式
  let cropLeft = 4; // 設定左側預設裁切像素寬度（確保移除左側黑框）
  let cropRight = 6; // 設定右側預設裁切像素寬度（確保移除右側黑框與亮藍立體邊線）

  try { // 使用 try-catch 確保像素讀取在任何環境下皆能安全執行
    bgImg.loadPixels(); // 載入背景圖片的像素陣列資料
    let w = bgImg.width; // 取得背景圖片的原始寬度
    let h = bgImg.height; // 取得背景圖片的原始高度
    let skyRows = max(10, floor(h * 0.35)); // 取圖片上方 35% 的純天空區域作為色彩比對基準
    let maxCheck = min(20, floor(w * 0.08)); // 設定左右兩側最多往內檢查 20 像素的邊框範圍
    let leftRefX = min(w - 1, maxCheck + 4); // 取得左側內部純淨天空的參考 X 座標
    let rightRefX = max(0, w - maxCheck - 5); // 取得右側內部純淨天空的參考 X 座標

    let isEdgeFrameCol = (colX, refX) => { // 定義內部判斷函式，比對指定欄與純淨天空參考欄的色差
      let diffSum = 0; // 累加該欄在天空區域與正常天空背景的 RGB 色差總和
      for (let y = 0; y < skyRows; y++) { // 由上往下掃描天空區域的每一個像素
        let idx = (y * w + colX) * 4; // 計算該像素在 pixels 陣列中的索引
        let refIdx = (y * w + refX) * 4; // 計算純淨天空參考像素在 pixels 陣列中的索引
        let dr = abs(bgImg.pixels[idx] - bgImg.pixels[refIdx]); // 計算紅色色版差異值
        let dg = abs(bgImg.pixels[idx + 1] - bgImg.pixels[refIdx + 1]); // 計算綠色色版差異值
        let db = abs(bgImg.pixels[idx + 2] - bgImg.pixels[refIdx + 2]); // 計算藍色色版差異值
        diffSum += (dr + dg + db); // 累加該列像素的總色差
      } // 結束天空區域垂直掃描迴圈
      return (diffSum / skyRows) > 18; // 若平均色差大於 18，代表該欄屬於外框或亮色邊線
    }; // 結束 isEdgeFrameCol 內部函式定義

    let detectedLeft = 0; // 初始化偵測到的左側邊框寬度
    for (let x = 0; x < maxCheck; x++) { // 由最左端往內逐欄檢查
      if (isEdgeFrameCol(x, leftRefX)) { // 若該欄判定為邊框線
        detectedLeft = x + 1; // 更新左側需要裁除的像素寬度
      } // 結束左側邊框判斷
    } // 結束左側掃描迴圈

    let detectedRight = 0; // 初始化偵測到的右側邊框寬度
    for (let x = w - 1; x >= w - maxCheck; x--) { // 由最右端往內逐欄檢查
      if (isEdgeFrameCol(x, rightRefX)) { // 若該欄判定為邊框線
        detectedRight = w - x; // 更新右側需要裁除的像素寬度
      } // 結束右側邊框判斷
    } // 結束右側掃描迴圈

    cropLeft = max(3, detectedLeft + 1); // 設定最終左側裁切像素數（多裁 1 像素確保邊緣完全乾淨）
    cropRight = max(6, detectedRight + 1); // 設定最終右側裁切像素數（多裁 1 像素徹底消除右側亮藍邊線）
  } catch (e) { // 若讀取像素發生例外狀況則進行錯誤捕捉
    cropLeft = 4; // 發生例外時使用安全的左側預設裁切寬度
    cropRight = 6; // 發生例外時使用安全的右側預設裁切寬度
  } // 結束 try-catch 例外處理

  let cleanW = max(1, bgImg.width - cropLeft - cropRight); // 計算裁除左右邊框後的純淨背景寬度
  cleanBgImg = bgImg.get(cropLeft, 0, cleanW, bgImg.height); // 直接擷取不含任何邊框像素的新圖片物件（防止縮放時邊框滲色）
} // buildCleanBackground 函式結束

function detectKickPeakYRatio() { // 分析腿部攻擊圖片精靈，找出角色腳部最高處相對高度的函式
  try { // 使用 try-catch 確保像素讀取在任何環境下皆能安全執行
    attackSheet.loadPixels(); // 載入腿部攻擊圖片精靈的像素陣列資料
    let frameW = floor(attackSheetW / attackFrames); // 計算單張腿部攻擊畫格的整數寬度
    let frameH = attackSheetH; // 取得單張腿部攻擊畫格的高度
    let maxFootX = 0; // 宣告變數，記錄踢腿伸展最遠（最右側）的 X 座標

    for (let f = 0; f < attackFrames; f++) { // 逐一檢查 13 張腿部攻擊畫格
      let offsetX = floor(f * (attackSheetW / attackFrames)); // 計算目前畫格在整張圖片精靈中的起始 X 座標
      for (let y = 0; y < frameH; y++) { // 由上往下掃描畫格內的每一個 Y 座標
        for (let x = 0; x < frameW; x++) { // 由左往右掃描畫格內的每一個 X 座標
          let idx = ((y * attackSheet.width) + (offsetX + x)) * 4; // 計算該像素在 pixels 陣列中的索引值
          let alpha = attackSheet.pixels[idx + 3]; // 取得該像素的透明度（Alpha 通道數值）
          if (alpha > 20 && x > maxFootX) { // 若為非透明像素且 X 座標更靠右（代表踢出的腳尖最遠處）
            maxFootX = x; // 更新腳部伸展最遠的 X 座標
          } // 結束最遠 X 座標判斷
        } // 結束 X 軸掃描迴圈
      } // 結束 Y 軸掃描迴圈
    } // 結束第一輪畫格掃描迴圈

    let minFootY = frameH; // 初始化腳部最高處的 Y 座標（圖片座標系中 Y 越小代表高度越高）
    let footZoneStartX = max(0, maxFootX - frameW * 0.15); // 設定腳部伸展前端區域的起始 X 範圍（排除身體與頭部）

    for (let f = 0; f < attackFrames; f++) { // 再次遍歷 13 張腿部攻擊畫格以精準取得腳尖最高點
      let offsetX = floor(f * (attackSheetW / attackFrames)); // 計算目前畫格在整張圖片精靈中的起始 X 座標
      for (let y = 0; y < frameH; y++) { // 由上往下掃描 Y 座標
        for (let x = floor(footZoneStartX); x <= maxFootX; x++) { // 僅掃描踢腿伸展前端的 X 範圍
          let idx = ((y * attackSheet.width) + (offsetX + x)) * 4; // 計算該像素在 pixels 陣列中的索引值
          let alpha = attackSheet.pixels[idx + 3]; // 取得該像素的透明度（Alpha 通道數值）
          if (alpha > 20 && y < minFootY) { // 若為非透明像素且 Y 座標更小（代表腳部位置更高）
            minFootY = y; // 更新角色腳部最高處的 Y 座標
          } // 結束最高 Y 座標判斷
        } // 結束腳部區域 X 軸掃描迴圈
      } // 結束 Y 軸掃描迴圈
    } // 結束第二輪畫格掃描迴圈

    if (minFootY < frameH) { // 確認有成功偵測到有效的腳部最高點像素
      return minFootY / frameH; // 回傳角色腳部最高處相對於單張畫格高度的比例
    } // 結束有效高度判斷
  } catch (e) { // 若讀取像素發生例外狀況則進行錯誤捕捉
    return 0.22; // 回傳預設的踢腿最高處高度比例
  } // 結束 try-catch 例外處理
  return 0.22; // 若未偵測到有效像素則回傳預設高度比例
} // detectKickPeakYRatio 函式結束

function drawSeamlessBackground() { // 繪製三張無縫串接背景圖片的函式（左右兩側接縫皆完全連貫無破圖）
  let baseX = Math.round(bgScrollX); // 將背景偏移量四捨五入為整數像素，避免次像素渲染產生縫隙
  let tileW = width + 2; // 讓每張背景圖左右各多延伸 1 像素重疊，確保交界處完全不漏出底色

  push(); // 保存目前畫布座標系統狀態
  translate(baseX + 1, 0); // 將畫布原點移動到左側背景圖與中間背景圖的接縫處
  scale(-1, 1); // 水平鏡像翻轉左側背景圖，使左接縫的雲層與地平線完全對稱銜接
  image(cleanBgImg, 0, 0, tileW, height); // 繪製純淨無邊框的左側鏡像背景圖
  pop(); // 恢復畫布座標系統狀態

  image(cleanBgImg, baseX - 1, 0, tileW, height); // 繪製純淨無邊框的中間主要背景圖

  push(); // 保存目前畫布座標系統狀態
  translate(baseX + width * 2 + 1, 0); // 將畫布原點移動到右側背景圖的最右端邊界
  scale(-1, 1); // 水平鏡像翻轉右側背景圖，使右接縫的雲層與地平線完全對稱銜接
  image(cleanBgImg, 0, 0, tileW, height); // 繪製純淨無邊框的右側鏡像背景圖
  pop(); // 恢復畫布座標系統狀態
} // drawSeamlessBackground 函式結束

function draw() { // p5.js 主繪圖迴圈函式，每秒預設執行 60 次
  background(0); // 先以黑色清除畫面，避免縮放視窗時產生殘影

  let charHeight = height / 3; // 計算角色1的顯示高度，固定為畫布高度的 1/3
  let moveSpeed = max(3, width * 0.005); // 依照畫布寬度計算水平移動速度，適應不同載具
  let centerScreenX = width / 2; // 取得畫布水平正中央的 X 座標基準點

  if (state !== 'attack') { // 當角色1目前沒有在執行腿部攻擊時，才偵測左右移動與站立狀態
    if (keyIsDown(RIGHT_ARROW)) { // 判斷是否持續按住鍵盤右鍵
      if (state !== 'walk') { // 若原本不是走路狀態
        currentFrame = 0; // 將動畫畫格重設為第 0 張，讓動作從頭播放
      } // 結束狀態切換判斷
      state = 'walk'; // 將角色狀態切換為走路
      facing = 1; // 將角色面向設定為右邊

      if (charCenterX < centerScreenX) { // 若角色1先前位於畫布左半側（尚未回到畫面中央）
        charCenterX = min(centerScreenX, charCenterX + moveSpeed); // 先讓角色1往右走回畫布正中央
      } else if (bgScrollX > -width) { // 當角色1在畫布中央且背景尚未捲動到最右邊界（-width）時
        bgScrollX = max(-width, bgScrollX - moveSpeed); // 讓三張串接的背景圖片整體往左移動
      } else { // 當背景已經移動到最右邊界（bgScrollX === -width）並暫停捲動時
        charCenterX += moveSpeed; // 角色1才開始往畫布右端移動
      } // 結束右鍵移動邏輯判斷
    } else if (keyIsDown(LEFT_ARROW)) { // 判斷是否持續按住鍵盤左鍵
      if (state !== 'walk') { // 若原本不是走路狀態
        currentFrame = 0; // 將動畫畫格重設為第 0 張，讓動作從頭播放
      } // 結束狀態切換判斷
      state = 'walk'; // 將角色狀態切換為走路
      facing = -1; // 將角色面向設定為左邊

      if (charCenterX > centerScreenX) { // 若角色1先前位於畫布右半側（尚未回到畫面中央）
        charCenterX = max(centerScreenX, charCenterX - moveSpeed); // 先讓角色1往左走回畫布正中央
      } else if (bgScrollX < width) { // 當角色1在畫布中央且背景尚未捲動到最左邊界（+width）時
        bgScrollX = min(width, bgScrollX + moveSpeed); // 讓三張串接的背景圖片整體往右移動
      } else { // 當背景已經移動到最左邊界（bgScrollX === width）並暫停捲動時
        charCenterX -= moveSpeed; // 角色1才開始往畫布左端移動
      } // 結束左鍵移動邏輯判斷
    } else { // 當左右鍵與空白鍵都沒有被按下時
      if (state !== 'idle') { // 若原本不是站立狀態
        currentFrame = 0; // 將動畫畫格重設為第 0 張
      } // 結束狀態切換判斷
      state = 'idle'; // 回復為站立圖片精靈顯示
    } // 結束按鍵狀態判斷
  } // 結束非攻擊狀態判斷

  drawSeamlessBackground(); // 呼叫無縫背景繪製函式，呈現完整連貫的三張串接背景圖

  let activeSheet; // 宣告變數，用來指向目前狀態對應的圖片精靈
  let totalFrames; // 宣告變數，用來儲存目前狀態的總畫格數
  let frameW; // 宣告變數，用來儲存單張畫格的原始寬度
  let frameH; // 宣告變數，用來儲存單張畫格的原始高度

  if (state === 'walk') { // 若目前狀態為走路
    activeSheet = walkSheet; // 指定使用走路圖片精靈
    totalFrames = walkFrames; // 設定總畫格數為 9
    frameW = walkSheetW / walkFrames; // 計算走路單張畫格寬度（1147 / 9）
    frameH = walkSheetH; // 設定走路單張畫格高度為 195
  } else if (state === 'attack') { // 若目前狀態為腿部攻擊
    activeSheet = attackSheet; // 指定使用腿部攻擊圖片精靈
    totalFrames = attackFrames; // 設定總畫格數為 13
    frameW = attackSheetW / attackFrames; // 計算腿部攻擊單張畫格寬度（3024 / 13）
    frameH = attackSheetH; // 設定腿部攻擊單張畫格高度為 179
  } else { // 其餘情況皆為站立狀態
    activeSheet = idleSheet; // 指定使用站立圖片精靈
    totalFrames = idleFrames; // 設定總畫格數為 8
    frameW = idleSheetW / idleFrames; // 計算站立單張畫格寬度（707 / 8）
    frameH = idleSheetH; // 設定站立單張畫格高度為 190
  } // 結束狀態參數設定

  let aspectRatio = frameW / frameH; // 計算目前動作單張圖片的原始寬高比例
  let charWidth = charHeight * aspectRatio; // 依照原始圖片寬高比例等比例修正角色1顯示寬度

  if (charCenterX + charWidth / 2 > width) { // 檢查角色1是否已移動到畫布最右端
    charCenterX = width - charWidth / 2; // 將角色1限制在畫布最右端停止移動，但動畫繼續播放
  } // 結束右邊界限制判斷
  if (charCenterX - charWidth / 2 < 0) { // 檢查角色1是否已移動到畫布最左端
    charCenterX = charWidth / 2; // 將角色1限制在畫布最左端停止移動，但動畫繼續播放
  } // 結束左邊界限制判斷

  let charX = charCenterX - charWidth / 2; // 計算角色1顯示畫面左上角的 X 座標
  let charY = height - charHeight; // 計算角色1顯示畫面左上角的 Y 座標，使最底端落在畫布最底端

  let frameIndex = floor(currentFrame) % totalFrames; // 取得目前要顯示的整數畫格索引
  let sx = frameIndex * frameW; // 計算要從圖片精靈中裁切的起始 X 座標

  if (facing === 1) { // 當角色1面向右邊時
    image(activeSheet, charX, charY, charWidth, charHeight, sx, 0, frameW, frameH); // 正常方向繪製角色1畫格
  } else { // 當角色1面向左邊時
    push(); // 保存目前畫布的座標系統狀態
    translate(charX + charWidth, charY); // 將畫布原點移動到角色1顯示區域的右上角
    scale(-1, 1); // 水平翻轉 X 軸，讓角色圖片轉向朝左
    image(activeSheet, 0, 0, charWidth, charHeight, sx, 0, frameW, frameH); // 在翻轉後的座標上繪製角色1畫格
    pop(); // 恢復先前保存的畫布座標系統狀態
  } // 結束角色方向繪製判斷

  if (state === 'attack') { // 若目前正在播放腿部攻擊動畫
    currentFrame += attackSpeed; // 依照 attackSpeed 推進攻擊動畫畫格
    let currentWave = floor(currentFrame / 4); // 計算目前累計已完整播放幾個「4 張畫格」區段（第 4、8、12 張時各為 1、2、3）
    if (currentWave > attackWavesSpawned && currentFrame < attackFrames) { // 每當腿部攻擊播放滿 4 張時觸發一次衝擊波特效
      spawnEffect(charX, charY, charWidth, charHeight, facing); // 在角色1前方產生一道腿部攻擊衝擊波特效
      attackWavesSpawned = currentWave; // 更新本次攻擊已發射的衝擊波次數，避免同一區段重複觸發
    } // 結束每 4 張產生特效判斷
    if (currentFrame >= attackFrames) { // 當 13 張腿部攻擊圖片全部播放完畢（只執行一次）
      state = 'idle'; // 將角色1狀態切回站立狀態
      currentFrame = 0; // 重設畫格計數器為 0
      attackWavesSpawned = 0; // 重設衝擊波發射次數計數器為 0
    } // 結束攻擊動畫完成判斷
  } else if (state === 'walk') { // 若目前正在播放走路動畫
    currentFrame = (currentFrame + walkSpeed) % totalFrames; // 依照 walkSpeed 循環推進走路畫格
  } else { // 若目前為站立動畫
    currentFrame = (currentFrame + idleSpeed) % totalFrames; // 依照 idleSpeed 循環推進站立畫格
  } // 結束動畫進度更新

  updateAndDrawEffects(); // 更新所有腿部攻擊特效的位置、動畫並繪製到畫布上
} // draw 函式結束

function keyPressed() { // p5.js 鍵盤按下事件監聽函式（每次按下按鍵觸發一次）
  if ((key === ' ' || keyCode === 32) && state !== 'attack') { // 當按下空白鍵且目前不在攻擊中時
    state = 'attack'; // 將角色1狀態切換為腿部攻擊
    currentFrame = 0; // 從第 0 張畫格開始播放攻擊動畫
    attackWavesSpawned = 0; // 初始化本次攻擊的衝擊波發射計數器為 0
  } // 結束空白鍵觸發判斷
} // keyPressed 函式結束

function spawnEffect(charX, charY, charWidth, charHeight, dir) { // 建立並發射腿部攻擊特效的函式
  let scaleRatio = charHeight / idleSheetH; // 計算目前畫布相對於角色原始高度的縮放比例
  let effFrameW = effectSheetW / effectFrames; // 計算單張特效畫格的原始寬度（143 / 4）
  let effFrameH = effectSheetH; // 計算單張特效畫格的原始高度（28 像素）
  let effW = effFrameW * scaleRatio * effectScale; // 依畫布比例與放大倍率計算特效顯示寬度
  let effH = effFrameH * scaleRatio * effectScale; // 依畫布比例與放大倍率計算特效顯示高度
  let startX = dir === 1 ? charX + charWidth * 0.75 : charX + charWidth * 0.25 - effW; // 依照角色面向決定特效生成的起始 X 座標
  let kickPeakY = charY + charHeight * kickPeakYRatio; // 計算角色腿部攻擊時腳部最高處在畫布上的實際 Y 座標
  let startY = kickPeakY - effH * 0.5; // 將放大後的特效垂直中心對齊角色腳部最高處的高度

  effects.push({ // 將新建立的特效物件加入特效陣列中
    x: startX, // 儲存特效目前的 X 座標
    y: startY, // 儲存特效目前的 Y 座標
    w: effW, // 儲存特效的顯示寬度
    h: effH, // 儲存特效的顯示高度
    dir: dir, // 儲存特效的移動方向（1 往右，-1 往左）
    frame: 0 // 初始化特效的動畫畫格計數器
  }); // 結束特效物件新增
} // spawnEffect 函式結束

function updateAndDrawEffects() { // 更新並繪製所有場上攻擊特效的函式
  let effFrameW = effectSheetW / effectFrames; // 計算單張特效畫格的原始寬度（143 / 4）
  let effFrameH = effectSheetH; // 計算單張特效畫格的原始高度（28 像素）
  let effSpeed = max(6, width * 0.01); // 依照畫布寬度計算特效的飛行速度

  for (let i = effects.length - 1; i >= 0; i--) { // 由後往前遍歷特效陣列，方便安全移除消失的特效
    let eff = effects[i]; // 取得目前正在處理的特效物件
    eff.x += eff.dir * effSpeed; // 依照特效方向往右或往左移動
    eff.frame = (eff.frame + 0.25) % effectFrames; // 循環更新特效本身的 4 張精靈動畫畫格

    let frameIndex = floor(eff.frame); // 取得目前特效的整數畫格索引
    let sx = frameIndex * effFrameW; // 計算要從特效圖片精靈裁切的起始 X 座標

    if (eff.dir === 1) { // 當特效往右移動時
      image(effectSheet, eff.x, eff.y, eff.w, eff.h, sx, 0, effFrameW, effFrameH); // 正常方向繪製特效畫格
    } else { // 當特效往左移動時
      push(); // 保存目前畫布座標狀態
      translate(eff.x + eff.w, eff.y); // 將原點移動到特效顯示區域的右上角
      scale(-1, 1); // 水平翻轉 X 軸，讓特效圖片朝左飛行
      image(effectSheet, 0, 0, eff.w, eff.h, sx, 0, effFrameW, effFrameH); // 繪製翻轉後的特效畫格
      pop(); // 恢復畫布座標狀態
    } // 結束特效方向繪製判斷

    if ((eff.dir === 1 && eff.x > width) || (eff.dir === -1 && eff.x + eff.w < 0)) { // 判斷特效是否已完全移出畫布右端或左端
      effects.splice(i, 1); // 從陣列中刪除該特效，使其從畫面上消失不見
    } // 結束邊界消失判斷
  } // 結束特效陣列迴圈
} // updateAndDrawEffects 函式結束

function windowResized() { // p5.js 視窗大小改變監聽函式，適應不同載具與螢幕縮放
  let xRatio = charCenterX / width; // 記錄視窗縮放前角色在畫布中的水平相對位置比例
  let bgRatio = bgScrollX / width; // 記錄視窗縮放前背景捲動偏移量的相對比例
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的全螢幕尺寸
  charCenterX = width * xRatio; // 依照原本的相對比例重新計算角色水平位置，避免跑出畫面外
  bgScrollX = width * bgRatio; // 依照原本的相對比例重新計算背景偏移量，維持捲動進度一致
} // windowResized 函式結束