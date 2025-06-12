// 選択ウィジェットを共通スタイルで挿入するスクリプト（詳細ウィジェットを削除）
(function () {
  // ウィジェット共通スタイル（背景色 #232f3e, ボーダー色 #0073bb）
  const widgetStyle = "flex:0 0 auto;background:#232f3e;border:1px solid #0073bb;border-radius:6px;padding:10px;text-align:center;";
  const linkStyle = "color:#ffffff;text-decoration:none;font-size:14px;display:inline-block;padding:6px 12px;";

  // 各ウィジェットの設定（simple と kindle のみ）
  const widgetConfigs = {
    photos: {
      elements: [
        { tag: 'a', text: 'Amazon Photos', url: 'https://www.amazon.co.jp/photos' }
      ]
    },
    kindle: {
      elements: [
        { tag: 'a', text: 'Kindle Unlimited', url: 'https://www.amazon.co.jp/kindle-dbs/hz/bookshelf?shoppingPortalEnabled=true&ref_=nav_em_gno_ku_0_2_8_9' }
      ]
    },
    manage_kindle: {
      elements: [
        { tag: 'a', text: 'Manage Kindle', url: 'https://www.amazon.co.jp/gp/kindle/ku/ku_central?ref_=nav_AccountFlyout_ku' }
      ]
    },
  };

  const insertWidgets = () => {
    const nav = document.getElementById('navbar-main') || document.getElementById('nav-main');
    if (!nav || !nav.parentNode) {
      console.warn('Amazon Widgets: nav element が見つかりません');
      return;
    }
    // 既存コンテナ削除
    const old = document.getElementById('amazon-widgets-container');
    if (old) old.remove();

    chrome.storage.sync.get({ widgetTypes: ['simple'] }, ({ widgetTypes }) => {
      if (!Array.isArray(widgetTypes) || widgetTypes.length === 0) return;
      const container = document.createElement('div');
      container.id = 'amazon-widgets-container';
      container.style.cssText = [
        'display: flex',
        'justify-content: center',
        'gap: 12px',
        'flex-wrap: wrap',
        'background: #E3E6E6',      // つけたい背景色
        'padding: 8px 0',           // 上下に余白（以前の margin と同等）
        'margin: 0 auto'            // 横センタリング
      ].join(';') + ';';

      widgetTypes.forEach(type => {
        const cfg = widgetConfigs[type];
        if (!cfg) return;
        const item = document.createElement('div');
        item.style.cssText = widgetStyle;
        cfg.elements.forEach(el => {
          const elem = document.createElement(el.tag);
          elem.textContent = el.text;
          if (el.url) elem.href = el.url;
          if (el.tag === 'a') elem.style.cssText = linkStyle;
          item.appendChild(elem);
        });
        container.appendChild(item);
      });
      nav.parentNode.insertBefore(container, nav.nextSibling);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertWidgets);
  } else {
    insertWidgets();
  }
})();
