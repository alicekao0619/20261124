let bgImg; // 宣告變數，用來儲存原始載入的背景圖片
let cleanBgImg; // 宣告變數，用來儲存已徹底裁除左右邊框線的純淨背景圖片
let idleSheet; // 宣告變數，用來儲存角色1的「站立」圖片精靈
let walkSheet; // 宣告變數，用來儲存角色1的「走」圖片精靈
let attackSheet; // 宣告變數，用來儲存角色1的「腿部攻擊」圖片精靈
let effectSheet; // 宣告變數，用來儲存「腿部攻擊特效」圖片精靈
let char2IdleSheet; // 宣告變數，用來儲存角色2的「站立」圖片精靈
let char2KickSheet; // 宣告變數，用來儲存角色2的「動作1 踢腿」圖片精靈

const idleFrames = 8; // 設定角色1站立動畫的總畫格數為 8 張
const idleSheetW = 707; // 設定角色1站立圖片精靈的總寬度為 707 像素
const idleSheetH = 190; // 設定角色1站立圖片精靈的總高度為 190 像素

const walkFrames = 9; // 設定角色1走路動畫的總畫格數為 9 張
const walkSheetW = 1147; // 設定角色1走路圖片精靈的總寬度為 1147 像素
const walkSheetH = 195; // 設定角色1走路圖片精靈的總高度為 195 像素

const attackFrames = 13; // 設定角色1腿部攻擊動畫的總畫格數為 13 張
const attackSheetW = 3024; // 設定角色1腿部攻擊圖片精靈的總寬度為 3024 像素
const attackSheetH = 179; // 設定角色1腿部攻擊圖片精靈的總高度為 179 像素

const effectFrames = 4; // 設定腿部攻擊特效的總畫格數為 4 張
const effectSheetW = 143; // 設定腿部攻擊特效圖片精靈的總寬度為 143 像素
const effectSheetH = 28; // 設定腿部攻擊特效圖片精靈的總高度為 28 像素

const char2IdleFrames = 10; // 設定角色2站立動畫的總畫格數為 10 張
const char2IdleSheetW = 595; // 設定角色2站立圖片精靈的總寬度為 595 像素
const char2IdleSheetH = 87; // 設定角色2站立圖片精靈的總高度為 87 像素

const char2KickFrames = 17; // 設定角色2動作1踢腿動畫的總畫格數為 17 張
const char2KickSheetW = 1882; // 設定角色2動作1踢腿圖片精靈的總寬度為 1882 像素
const char2KickSheetH = 92; // 設定角色2動作1踢腿圖片精靈的總高度為 92 像素

const trafficQuizBank = [ // 建立台灣交通規則選擇題題庫陣列
  { // 第 1 題：行人穿越道禮讓規定
    q: '行經行人穿越道遇有行人通行時，應如何行駛？', // 題目敘述文字
    opts: ['暫停讓行人優先通行', '按喇叭提醒行人快走', '加速搶先通過路口', '直接繞過行人前進'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 1 題物件
  { // 第 2 題：機車安全帽配戴規定
    q: '在台灣騎乘機車時，駕駛與乘客應如何配戴安全帽？', // 題目敘述文字
    opts: ['正確配戴並扣緊帽帶', '只需放在頭上不需扣', '短距離騎乘可以不戴', '只有駕駛人需要配戴'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 2 題物件
  { // 第 3 題：閃光紅燈號誌規定
    q: '行車遇見前方路口號誌為「閃光紅燈」時，應如何處置？', // 題目敘述文字
    opts: ['停車再開並注意來車', '減速慢行不需停車', '加速通過避免塞車', '直接轉彎無需禮讓'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 3 題物件
  { // 第 4 題：無號誌路口路權規定
    q: '行經無號誌交岔路口時，支線道車應如何禮讓？', // 題目敘述文字
    opts: ['暫停讓幹線道車先行', '搶先通過無需禮讓', '按喇叭示意對方停車', '與幹線道車同時搶行'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 4 題物件
  { // 第 5 題：一般道路速限規定
    q: '在沒有劃設速限標誌的市區一般道路上，最高時速為何？', // 題目敘述文字
    opts: ['每小時 50 公里', '每小時 70 公里', '每小時 80 公里', '每小時 90 公里'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 5 題物件
  { // 第 6 題：轉彎顯示方向燈規定
    q: '車輛轉彎或變換車道前，應於距路口幾公尺前打方向燈？', // 題目敘述文字
    opts: ['30 公尺前顯示方向燈', '5 公尺前再打方向燈', '轉彎當下再打方向燈', '白天不需要打方向燈'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 6 題物件
  { // 第 7 題：紅線禁止停車規定
    q: '道路邊線繪有「紅色實線」的路段，代表什麼規定？', // 題目敘述文字
    opts: ['禁止臨時停車與停車', '可臨時停車上下乘客', '夜間開放免費停車', '僅限機車停放區域'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 7 題物件
  { // 第 8 題：禮讓緊急車輛規定
    q: '聞有消防車、救護車或警備車之警號時，應如何行駛？', // 題目敘述文字
    opts: ['立即避讓並不得跟隨', '加速行駛在前方帶路', '停在路中央原地不動', '跟在後方趁機超車'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 8 題物件
  { // 第 9 題：超車方向規定
    q: '在一般道路上超車時，應從前車的哪一側超越才合法？', // 題目敘述文字
    opts: ['左側超越', '右側超越', '路肩超越', '跨越雙黃線超越'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  }, // 結束第 9 題物件
  { // 第 10 題：閃光黃燈號誌規定
    q: '路口號誌為「閃光黃燈」時，警告車輛應如何行駛？', // 題目敘述文字
    opts: ['減速接近並小心通過', '必須完全停車再開', '保持高速直接通過', '禁止任何車輛通行'], // 四個選項內容（第 0 項為正解）
    ans: 0 // 正確答案在 opts 陣列中的索引為 0
  } // 結束第 10 題物件
]; // 結束台灣交通規則題庫陣列

let state = 'idle'; // 記錄角色1目前的動作狀態（'idle' 站立、'walk' 走路、'attack' 腿部攻擊）
let facing = 1; // 記錄角色1目前的面向方向（1 代表面向右邊，-1 代表面向左邊）
let charCenterX; // 記錄角色1在畫布上的水平中心點 X 座標
let bgScrollX = 0; // 記錄中間背景圖片的水平偏移量（範圍為 -width 到 +width，共三張背景圖串接）
let currentFrame = 0; // 記錄角色1目前動畫播放到的畫格索引值
let attackWavesSpawned = 0; // 記錄本次腿部攻擊期間已發射的衝擊波特效次數（每播放 4 張觸發 1 次）
let idleSpeed = 0.18; // 設定角色1站立動作的動畫播放速度
let walkSpeed = 0.12; // 設定角色1走路動作的動畫播放速度（約 1.25 秒播完 9 張）
let attackSpeed = 0.14; // 設定角色1腿部攻擊的動畫播放速度（約 1.55 秒播完 13 張）
let effectScale = 2.8; // 設定腿部攻擊特效的放大倍率（2.8 倍增強攻擊魄力）
let kickPeakYRatio = 0.22; // 記錄角色1腿部攻擊時腳部最高處相對於畫格高度的比例（預設 0.22）
let effects = []; // 宣告陣列，用來存放目前畫面上所有正在移動的攻擊特效物件

let char2State = 'idle'; // 記錄角色2目前的動作狀態（'idle' 站立、'kick' 動作1踢腿）
let char2Frame = 0; // 記錄角色2目前動畫播放到的畫格索引值
let char2IdleSpeed = 0.16; // 設定角色2站立動畫的循環播放速度
let char2KickSpeed = 0.14; // 設定角色2踢腿攻擊動畫的循環播放速度（與角色1出招節奏協調一致）

let isNearChar2 = false; // 記錄角色1目前是否處於接近角色2的互動範圍內
let lastQuizIndex = -1; // 記錄上一題抽中的題庫索引，避免連續出現同一道題目
let quizQuestion = ''; // 儲存目前台灣交通規則選擇題的題目文字
let quizOptions = []; // 儲存目前選擇題洗牌後的四個選項文字陣列
let quizCorrectIndex = 0; // 儲存正確答案在選項陣列中的索引位置（0 到 3）
let selectedOptionIndex = -1; // 記錄使用者目前點選的選項索引（-1 代表尚未作答）
let quizFeedback = ''; // 儲存作答後的提示回饋文字（答對或答錯提示）
let optionRects = []; // 儲存四個選項按鈕在畫布上的座標與尺寸，供滑鼠點擊判斷使用

function preload() { // p5.js 預載入函式，確保所有圖片載入完成後才執行 setup
  bgImg = loadImage('bg/0.png'); // 載入背景圖片（使用正斜線避免 \0 變成跳脫字元）
  idleSheet = loadImage('1/站立/all站立.png'); // 載入角色1站立圖片精靈檔案
  walkSheet = loadImage('1/走/all走.png'); // 載入角色1走路圖片精靈檔案
  attackSheet = loadImage('1/腿部攻擊/all腿部攻擊.png'); // 載入角色1腿部攻擊圖片精靈檔案
  effectSheet = loadImage('1/腿部攻擊 特效/all腿部攻擊特效.png'); // 載入腿部攻擊特效圖片精靈檔案
  char2IdleSheet = loadImage('2/站立/all站立.png'); // 載入角色2站立圖片精靈檔案
  char2KickSheet = loadImage('2/動作1 踢腿/all動作1 踢腿.png'); // 載入角色2動作1踢腿圖片精靈檔案
} // preload 函式結束

function setup() { // p5.js 初始化函式，網頁載入時執行一次
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗大小的全螢幕畫布
  imageMode(CORNER); // 設定圖片繪製基準點為左上角
  charCenterX = width / 2; // 初始化角色1的水平中心點在畫布正中央
  bgScrollX = 0; // 初始化背景水平偏移量為 0（顯示三張串接背景圖的中間那一張）
  buildCleanBackground(); // 建立已徹底移除左右邊框與立體外框線的純淨背景圖片
  kickPeakYRatio = detectKickPeakYRatio(); // 自動偵測腿部攻擊圖片精靈中角色腳部最高處的高度比例
  generateTrafficQuiz(); // 預先抽取一題台灣交通規則選擇題備用
} // setup 函式結束

function generateTrafficQuiz() { // 從題庫隨機抽取一題台灣交通規則選擇題並打亂選項的函式
  let idx = floor(random(trafficQuizBank.length)); // 隨機產生一個題庫索引值
  if (trafficQuizBank.length > 1 && idx === lastQuizIndex) { // 若抽到與上一題相同的題目
    idx = (idx + 1) % trafficQuizBank.length; // 自動改選下一題以避免連續重複
  } // 結束避免連續重複題目判斷
  lastQuizIndex = idx; // 更新本次抽中的題庫索引記錄

  let item = trafficQuizBank[idx]; // 取得該題目的完整題庫資料物件
  quizQuestion = item.q; // 設定目前顯示的交通規則題目字串
  let correctText = item.opts[item.ans]; // 取得該題目正確答案的文字內容
  quizOptions = shuffle([...item.opts]); // 複製四個選項並隨機洗牌打亂順序
  quizCorrectIndex = quizOptions.indexOf(correctText); // 找出洗牌後正確答案所在的新索引位置
  selectedOptionIndex = -1; // 重設玩家已選取的選項索引為未作答狀態
  quizFeedback = ''; // 清空上一題的作答回饋訊息
} // generateTrafficQuiz 函式結束

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
  cleanBgImg = bgImg.get(cropLeft, 0, cleanW, bgImg.height); // 直接擷取不含任何邊框像素的新圖片物件
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
    let footZoneStartX = max(0, maxFootX - frameW * 0.15); // 設定腳部伸展前端區域的起始 X 範圍

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
  image(cleanBgImg, 0, 0, tileW, height); // 繪製純淨無邊框的左側鏡像背景圖（三張背景圖中最左邊的一張）
  pop(); // 恢復畫布座標系統狀態

  image(cleanBgImg, baseX - 1, 0, tileW, height); // 繪製純淨無邊框的中間主要背景圖

  push(); // 保存目前畫布座標系統狀態
  translate(baseX + width * 2 + 1, 0); // 將畫布原點移動到右側背景圖的最右端邊界
  scale(-1, 1); // 水平鏡像翻轉右側背景圖，使右接縫的雲層與地平線完全對稱銜接
  image(cleanBgImg, 0, 0, tileW, height); // 繪製純淨無邊框的右側鏡像背景圖
  pop(); // 恢復畫布座標系統狀態
} // drawSeamlessBackground 函式結束

function updateAndDrawCharacter2(char1CenterX, char1Width, charHeight) { // 更新狀態並繪製角色2的函式
  let char2CenterX = bgScrollX - width / 2; // 計算角色2的水平中心點，固定位於三張背景圖中最左邊那張的正中央
  let distance = abs(char1CenterX - char2CenterX); // 計算角色1與角色2之間的水平中心距離
  let baseChar2IdleW = charHeight * ((char2IdleSheetW / char2IdleFrames) / char2IdleSheetH); // 計算角色2站立時的基準顯示寬度
  let triggerDistance = (char1Width + baseChar2IdleW) * 1.15; // 設定觸發角色2踢腿攻擊與顯示題目方框的接近判定距離

  if (distance <= triggerDistance) { // 當角色1接近角色2（小於或等於觸發距離）時
    if (!isNearChar2) { // 若角色1剛從遠處走進角色2的互動範圍內
      generateTrafficQuiz(); // 重新抽取一題新的台灣交通規則選擇題
    } // 結束剛進入接近範圍判斷
    isNearChar2 = true; // 標記角色1目前正接近角色2
    if (char2State !== 'kick') { // 若角色2原本不是踢腿狀態
      char2Frame = 0; // 將角色2動畫畫格重設為第 0 張，從頭開始播放踢腿動作
    } // 結束角色2狀態切換判斷
    char2State = 'kick'; // 將角色2狀態切換為「動作1 踢腿」
  } else { // 當角色1遠離角色2（大於觸發距離）時
    isNearChar2 = false; // 標記角色1已離開角色2的互動範圍
    if (char2State !== 'idle') { // 若角色2原本不是站立狀態
      char2Frame = 0; // 將角色2動畫畫格重設為第 0 張，從頭開始播放站立動作
    } // 結束角色2狀態恢復判斷
    char2State = 'idle'; // 恢復角色2顯示「站立」圖片精靈
  } // 結束角色1與角色2距離互動判斷

  let activeChar2Sheet; // 宣告變數，指向角色2目前狀態對應的圖片精靈
  let totalChar2Frames; // 宣告變數，儲存角色2目前狀態的總畫格數
  let c2FrameW; // 宣告變數，儲存角色2單張畫格的原始寬度
  let c2FrameH; // 宣告變數，儲存角色2單張畫格的原始高度
  let c2AnimSpeed; // 宣告變數，儲存角色2目前的動畫播放速度

  if (char2State === 'kick') { // 若角色2目前為踢腿狀態
    activeChar2Sheet = char2KickSheet; // 指定使用角色2動作1踢腿圖片精靈（2/動作1 踢腿/all動作1 踢腿.png）
    totalChar2Frames = char2KickFrames; // 設定總畫格數為 17 張
    c2FrameW = char2KickSheetW / char2KickFrames; // 計算踢腿單張畫格寬度（1882 / 17）
    c2FrameH = char2KickSheetH; // 設定踢腿單張畫格高度為 92 像素
    c2AnimSpeed = char2KickSpeed; // 套用踢腿動畫播放速度
  } else { // 若角色2目前為站立狀態
    activeChar2Sheet = char2IdleSheet; // 指定使用角色2站立圖片精靈（2/站立/all站立.png）
    totalChar2Frames = char2IdleFrames; // 設定總畫格數為 10 張
    c2FrameW = char2IdleSheetW / char2IdleFrames; // 計算站立單張畫格寬度（595 / 10）
    c2FrameH = char2IdleSheetH; // 設定站立單張畫格高度為 87 像素
    c2AnimSpeed = char2IdleSpeed; // 套用站立動畫播放速度
  } // 結束角色2參數設定

  let c2AspectRatio = c2FrameW / c2FrameH; // 計算角色2目前動作單張畫格的原始寬高比例
  let char2Width = charHeight * c2AspectRatio; // 依照原始圖片寬高比例等比例計算角色2顯示寬度
  let char2X = char2CenterX - char2Width / 2; // 計算角色2顯示區域左上角的 X 座標
  let char2Y = height - charHeight; // 計算角色2顯示區域左上角的 Y 座標，使其最底端落在畫布最底端
  let c2Facing = char1CenterX >= char2CenterX ? 1 : -1; // 讓角色2自動面向角色1所在方向（在角色1左側時面向右邊）

  let c2FrameIndex = floor(char2Frame) % totalChar2Frames; // 取得角色2目前要顯示的整數畫格索引
  let c2Sx = c2FrameIndex * c2FrameW; // 計算要從角色2圖片精靈中裁切的起始 X 座標

  if (c2Facing === 1) { // 當角色2面向右邊（朝向角色1）時
    image(activeChar2Sheet, char2X, char2Y, char2Width, charHeight, c2Sx, 0, c2FrameW, c2FrameH); // 正常方向繪製角色2畫格
  } else { // 當角色2面向左邊時
    push(); // 保存目前畫布座標系統狀態
    translate(char2X + char2Width, char2Y); // 將畫布原點移動到角色2顯示區域的右上角
    scale(-1, 1); // 水平翻轉 X 軸，讓角色2轉向朝左
    image(activeChar2Sheet, 0, 0, char2Width, charHeight, c2Sx, 0, c2FrameW, c2FrameH); // 繪製翻轉後的角色2畫格
    pop(); // 恢復先前保存的畫布座標系統狀態
  } // 結束角色2方向繪製判斷

  char2Frame = (char2Frame + c2AnimSpeed) % totalChar2Frames; // 持續循環更新角色2的動畫畫格計數器
} // updateAndDrawCharacter2 函式結束

function drawTrafficQuizBox() { // 在畫布上方繪製半透明和諧綠色台灣交通規則選擇題方框的函式
  if (!isNearChar2) { // 若角色1目前沒有接近角色2
    optionRects = []; // 清空選項按鈕碰撞區域陣列
    return; // 直接結束函式，不顯示方框
  } // 結束接近狀態檢查

  let boxW = width / 3; // 設定方框寬度為整個畫布寬度的 1/3
  let boxH = height / 2; // 設定方框高度為整個畫布高度的 1/2
  let boxX = (width - boxW) / 2; // 計算方框左上角 X 座標，使方框水平中心對準畫布正中央
  let boxY = max(12, height * 0.025); // 設定方框左上角 Y 座標，使其上方靠近畫布上方

  push(); // 保存目前畫布繪圖樣式與座標狀態
  fill(46, 92, 78, 90); // 設定與背景暮色藍紫和諧的沉穩青綠色，並將透明度設為 90
  stroke(166, 214, 194, 180); // 設定柔和淺青綠色外框線，提升半透明方框的邊界辨識度
  strokeWeight(2); // 設定方框邊框線條粗細為 2 像素
  rect(boxX, boxY, boxW, boxH, 16); // 繪製圓角矩形交通規則題目方框

  let titleSize = constrain(min(boxW * 0.048, boxH * 0.068), 13, 24); // 依方框尺寸自動計算標題文字大小
  let questionSize = constrain(min(boxW * 0.052, boxH * 0.072), 14, 24); // 依方框尺寸自動計算題目文字大小
  let optionSize = constrain(min(boxW * 0.046, boxH * 0.065), 13, 22); // 依方框尺寸自動計算選項文字大小

  noStroke(); // 關閉文字外框線
  textAlign(CENTER, CENTER); // 設定文字水平與垂直皆為置中對齊

  fill(20, 42, 36, 180); // 設定深綠色文字陰影色，確保在透明度 90 下文字依然清晰易讀
  textSize(titleSize); // 套用標題字體大小
  text('台灣交通規則測驗（點擊或按 1~4 作答）', boxX + boxW / 2 + 1, boxY + boxH * 0.095 + 1); // 繪製標題陰影
  fill(232, 252, 242); // 設定明亮淺青白色作為標題主文字顏色
  text('台灣交通規則測驗（點擊或按 1~4 作答）', boxX + boxW / 2, boxY + boxH * 0.095); // 繪製標題文字

  let qBoxX = boxX + boxW * 0.08; // 設定題目文字自動換行區塊的左上角 X 座標
  let qBoxY = boxY + boxH * 0.16; // 設定題目文字自動換行區塊的左上角 Y 座標
  let qBoxW = boxW * 0.84; // 設定題目文字自動換行區塊的最大寬度（避免超出綠色方框）
  let qBoxH = boxH * 0.21; // 設定題目文字自動換行區塊的最大高度

  fill(20, 42, 36, 195); // 設定題目文字深色陰影
  textSize(questionSize); // 套用題目字體大小
  text(quizQuestion, qBoxX + 1.5, qBoxY + 1.5, qBoxW, qBoxH); // 繪製交通規則題目文字陰影（支援自動換行）
  fill(255, 250, 215); // 設定柔和暖米黃色作為題目主文字顏色
  text(quizQuestion, qBoxX, qBoxY, qBoxW, qBoxH); // 繪製台灣交通規則題目文字（支援自動換行）

  let labels = ['(1) ', '(2) ', '(3) ', '(4) ']; // 定義四個選項的編號前綴標籤
  let optW = boxW * 0.82; // 設定每個選項按鈕的寬度為方框寬度的 82%
  let optH = boxH * 0.108; // 設定每個選項按鈕的高度為方框高度的 10.8%
  let optX = boxX + (boxW - optW) / 2; // 計算選項按鈕水平置中的左上角 X 座標
  let startOptY = boxY + boxH * 0.39; // 設定第一個選項按鈕的起始 Y 座標
  let optGap = boxH * 0.132; // 設定相鄰選項按鈕之間的垂直間距

  optionRects = []; // 清空並重新記錄目前畫格中四個選項按鈕的座標範圍
  for (let i = 0; i < 4; i++) { // 逐一繪製四個選擇題選項按鈕
    let optY = startOptY + i * optGap; // 計算第 i 個選項按鈕的 Y 座標
    optionRects.push({ x: optX, y: optY, w: optW, h: optH, index: i }); // 儲存該選項的點擊感應區域

    let isHover = mouseX >= optX && mouseX <= optX + optW && mouseY >= optY && mouseY <= optY + optH; // 判斷滑鼠游標是否懸停在此選項上
    if (selectedOptionIndex === i) { // 若此選項為使用者剛點選的答案
      if (i === quizCorrectIndex) { // 若點選的是正確答案
        fill(62, 148, 108, 175); // 以明亮翠綠色標示答對選項
      } else { // 若點選的是錯誤答案
        fill(168, 72, 72, 175); // 以柔和磚紅色標示答錯選項
      } // 結束對錯顏色判斷
    } else if (isHover) { // 若滑鼠懸停在未選取的選項上
      fill(74, 134, 114, 145); // 以較亮的青綠色呈現滑鼠懸停互動高亮效果
    } else { // 一般未選取狀態下的選項底色
      fill(36, 74, 62, 120); // 使用與方框色調和諧的深青綠半透明底色
    } // 結束選項底色狀態判斷

    stroke(180, 224, 206, 160); // 設定選項按鈕的細邊框顏色
    strokeWeight(1.5); // 設定選項按鈕邊框粗細為 1.5 像素
    rect(optX, optY, optW, optH, 10); // 繪製圓角選項按鈕外框

    noStroke(); // 關閉選項文字外框線
    textSize(optionSize); // 套用選項文字大小
    let optionLabel = labels[i] + quizOptions[i]; // 組合編號與選項內容的完整文字
    fill(18, 36, 30, 180); // 設定選項文字深色陰影
    text(optionLabel, optX + optW / 2 + 1, optY + optH / 2 + 1); // 繪製選項文字陰影
    fill(245, 255, 250); // 設定選項純白微青主文字顏色
    text(optionLabel, optX + optW / 2, optY + optH / 2); // 繪製選項文字
  } // 結束四個選項按鈕繪製迴圈

  if (quizFeedback !== '') { // 若使用者已作答並產生回饋訊息
    textSize(optionSize * 0.95); // 設定回饋訊息字體大小
    let feedbackY = boxY + boxH * 0.945; // 設定回饋訊息顯示在方框底部區域
    fill(18, 36, 30, 200); // 設定回饋文字深色陰影
    text(quizFeedback, boxX + boxW / 2 + 1, feedbackY + 1); // 繪製回饋文字陰影
    if (selectedOptionIndex === quizCorrectIndex) { // 若答對題目
      fill(175, 255, 205); // 以亮薄荷綠顯示答對提示
    } else { // 若答錯題目
      fill(255, 205, 195); // 以淺珊瑚粉顯示再試一次提示
    } // 結束回饋文字顏色判斷
    text(quizFeedback, boxX + boxW / 2, feedbackY); // 繪製作答回饋提示文字
  } // 結束回饋訊息顯示判斷

  pop(); // 恢復先前保存的畫布繪圖樣式與座標狀態
} // drawTrafficQuizBox 函式結束

function checkQuizAnswer(optionIdx) { // 檢查使用者所選交通規則答案是否正確的函式
  if (optionIdx < 0 || optionIdx >= quizOptions.length) { // 檢查選項索引是否在有效範圍內
    return; // 若索引無效則直接返回
  } // 結束有效索引檢查
  selectedOptionIndex = optionIdx; // 記錄使用者選擇的選項索引
  if (optionIdx === quizCorrectIndex) { // 判斷所選選項是否為正確答案
    quizFeedback = '答對了！遵守交通規則最安全！'; // 設定答對鼓勵提示訊息
  } else { // 若選錯答案
    quizFeedback = '答錯了，請再想想看！'; // 設定答錯重試提示訊息
  } // 結束答案對錯判斷
} // checkQuizAnswer 函式結束

function draw() { // p5.js 主繪圖迴圈函式，每秒預設執行 60 次
  background(0); // 先以黑色清除畫面，避免縮放視窗時產生殘影

  let charHeight = height / 3; // 計算角色顯示高度，固定為畫布高度的 1/3
  let moveSpeed = max(3, width * 0.005); // 依照畫布寬度計算水平移動速度，適應不同載具
  let centerScreenX = width / 2; // 取得畫布水平正中央的 X 座標基準點

  if (state !== 'attack') { // 當角色1目前沒有在執行腿部攻擊時，才偵測左右移動與站立狀態
    if (keyIsDown(RIGHT_ARROW)) { // 判斷是否持續按住鍵盤右鍵
      if (state !== 'walk') { // 若原本不是走路狀態
        currentFrame = 0; // 將動畫畫格重設為第 0 張，讓動作從頭播放
      } // 結束狀態切換判斷
      state = 'walk'; // 將角色1狀態切換為走路
      facing = 1; // 將角色1面向設定為右邊

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
      state = 'walk'; // 將角色1狀態切換為走路
      facing = -1; // 將角色1面向設定為左邊

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

  let activeSheet; // 宣告變數，用來指向角色1目前狀態對應的圖片精靈
  let totalFrames; // 宣告變數，用來儲存角色1目前狀態的總畫格數
  let frameW; // 宣告變數，用來儲存角色1單張畫格的原始寬度
  let frameH; // 宣告變數，用來儲存角色1單張畫格的原始高度

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

  let aspectRatio = frameW / frameH; // 計算角色1目前動作單張圖片的原始寬高比例
  let charWidth = charHeight * aspectRatio; // 依照原始圖片寬高比例等比例修正角色1顯示寬度

  if (charCenterX + charWidth / 2 > width) { // 檢查角色1是否已移動到畫布最右端
    charCenterX = width - charWidth / 2; // 將角色1限制在畫布最右端停止移動，但動畫繼續播放
  } // 結束右邊界限制判斷
  if (charCenterX - charWidth / 2 < 0) { // 檢查角色1是否已移動到畫布最左端
    charCenterX = charWidth / 2; // 將角色1限制在畫布最左端停止移動，但動畫繼續播放
  } // 結束左邊界限制判斷

  updateAndDrawCharacter2(charCenterX, charWidth, charHeight); // 更新並繪製位於最左邊背景圖中央的角色2

  let charX = charCenterX - charWidth / 2; // 計算角色1顯示畫面左上角的 X 座標
  let charY = height - charHeight; // 計算角色1顯示畫面左上角的 Y 座標，使最底端落在畫布最底端

  let frameIndex = floor(currentFrame) % totalFrames; // 取得角色1目前要顯示的整數畫格索引
  let sx = frameIndex * frameW; // 計算要從角色1圖片精靈中裁切的起始 X 座標

  if (facing === 1) { // 當角色1面向右邊時
    image(activeSheet, charX, charY, charWidth, charHeight, sx, 0, frameW, frameH); // 正常方向繪製角色1畫格
  } else { // 當角色1面向左邊時
    push(); // 保存目前畫布的座標系統狀態
    translate(charX + charWidth, charY); // 將畫布原點移動到角色1顯示區域的右上角
    scale(-1, 1); // 水平翻轉 X 軸，讓角色1圖片轉向朝左
    image(activeSheet, 0, 0, charWidth, charHeight, sx, 0, frameW, frameH); // 在翻轉後的座標上繪製角色1畫格
    pop(); // 恢復先前保存的畫布座標系統狀態
  } // 結束角色1方向繪製判斷

  if (state === 'attack') { // 若角色1目前正在播放腿部攻擊動畫
    currentFrame += attackSpeed; // 依照 attackSpeed 推進攻擊動畫畫格
    let currentWave = floor(currentFrame / 4); // 計算目前累計已完整播放幾個「4 張畫格」區段
    if (currentWave > attackWavesSpawned && currentFrame < attackFrames) { // 每當腿部攻擊播放滿 4 張時觸發一次衝擊波特效
      spawnEffect(charX, charY, charWidth, charHeight, facing); // 在角色1前方產生一道腿部攻擊衝擊波特效
      attackWavesSpawned = currentWave; // 更新本次攻擊已發射的衝擊波次數，避免同一區段重複觸發
    } // 結束每 4 張產生特效判斷
    if (currentFrame >= attackFrames) { // 當 13 張腿部攻擊圖片全部播放完畢（只執行一次）
      state = 'idle'; // 將角色1狀態切回站立狀態
      currentFrame = 0; // 重設畫格計數器為 0
      attackWavesSpawned = 0; // 重設衝擊波發射次數計數器為 0
    } // 結束攻擊動畫完成判斷
  } else if (state === 'walk') { // 若角色1目前正在播放走路動畫
    currentFrame = (currentFrame + walkSpeed) % totalFrames; // 依照 walkSpeed 循環推進走路畫格
  } else { // 若角色1目前為站立動畫
    currentFrame = (currentFrame + idleSpeed) % totalFrames; // 依照 idleSpeed 循環推進站立畫格
  } // 結束動畫進度更新

  updateAndDrawEffects(); // 更新所有腿部攻擊特效的位置、動畫並繪製到畫布上
  drawTrafficQuizBox(); // 當角色1接近角色2時，在畫布上方顯示台灣交通規則選擇題綠色方框
} // draw 函式結束

function mousePressed() { // p5.js 滑鼠點擊事件監聽函式
  if (isNearChar2) { // 當交通規則選擇題方框顯示中時
    for (let i = 0; i < optionRects.length; i++) { // 逐一檢查滑鼠是否點擊在四個選項按鈕範圍內
      let r = optionRects[i]; // 取得第 i 個選項按鈕的座標與尺寸
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) { // 判斷滑鼠點擊位置是否在按鈕內
        checkQuizAnswer(r.index); // 驗證該選項是否為正確答案
        break; // 找到被點擊的按鈕後跳出迴圈
      } // 結束按鈕點擊範圍判斷
    } // 結束選項按鈕遍歷迴圈
  } // 結束接近角色2互動判斷
} // mousePressed 函式結束

function keyPressed() { // p5.js 鍵盤按下事件監聽函式（每次按下按鍵觸發一次）
  if ((key === ' ' || keyCode === 32) && state !== 'attack') { // 當按下空白鍵且目前不在攻擊中時
    state = 'attack'; // 將角色1狀態切換為腿部攻擊
    currentFrame = 0; // 從第 0 張畫格開始播放攻擊動畫
    attackWavesSpawned = 0; // 初始化本次攻擊的衝擊波發射計數器為 0
  } // 結束空白鍵觸發判斷

  if (isNearChar2) { // 當角色1接近角色2且選擇題方框顯示中時，支援鍵盤數字鍵 1~4 快速作答
    if (key === '1') { // 若按下數字鍵 1
      checkQuizAnswer(0); // 選擇第 1 個選項
    } else if (key === '2') { // 若按下數字鍵 2
      checkQuizAnswer(1); // 選擇第 2 個選項
    } else if (key === '3') { // 若按下數字鍵 3
      checkQuizAnswer(2); // 選擇第 3 個選項
    } else if (key === '4') { // 若按下數字鍵 4
      checkQuizAnswer(3); // 選擇第 4 個選項
    } // 結束數字鍵 1~4 選項判斷
  } // 結束選擇題鍵盤作答判斷
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
  let xRatio = charCenterX / width; // 記錄視窗縮放前角色1在畫布中的水平相對位置比例
  let bgRatio = bgScrollX / width; // 記錄視窗縮放前背景捲動偏移量的相對比例
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的全螢幕尺寸
  charCenterX = width * xRatio; // 依照原本的相對比例重新計算角色1水平位置，避免跑出畫面外
  bgScrollX = width * bgRatio; // 依照原本的相對比例重新計算背景偏移量，維持捲動進度一致
} // windowResized 函式結束