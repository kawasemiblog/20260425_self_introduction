document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. スクロール時のフェードインアニメーション
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 10%表示されたら発火
        rootMargin: '0px 0px -50px 0px' // 少し早めに発火させる
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // ==========================================
    // 2. カード（趣味・食べ物）のクリックインタラクション
    // ==========================================
    const cards = document.querySelectorAll('.hobby-card, .food-card');
    
    // カードごとの楽しい一言メッセージ
    const cardMessages = {
        walking: '🚶‍♂️ 次回は24時間以内の完歩を目指してトレーニング中です！',
        mountain: '⛰️ 富士山をはじめ、四季折々の美しい名峰に挑戦しています。',
        hamburg: '🥩 粗挽き肉の手ごねハンバーグ！ジューシーで食べ応え抜群です。',
        omurice: '🍳 とろっとろの半熟卵にデミグラスやケチャップを合わせるのが至福です。',
        curry: '🍛 スパイスを調合して作るこだわりカレー！辛さは中辛が一番好きです。'
    };

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const cardType = card.getAttribute('data-hobby') || card.getAttribute('data-food');
            const message = cardMessages[cardType];

            if (!message) return;

            // 既存の吹き出しがあれば削除する
            const existingTooltip = card.querySelector('.card-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
                return;
            }

            // 他のカードの吹き出しもクリアする
            document.querySelectorAll('.card-tooltip').forEach(tooltip => tooltip.remove());

            // 吹き出し（ツールチップ）の作成
            const tooltip = document.createElement('div');
            tooltip.className = 'card-tooltip';
            tooltip.textContent = message;

            // スタイリング用のインラインスタイル（またはCSSで定義しても良いが、手軽さと動的制御のために追加）
            Object.assign(tooltip.style, {
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%) translateY(10px)',
                backgroundColor: '#ffffff',
                color: 'var(--text-secondary)',
                padding: '10px 16px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                fontSize: '0.85rem',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                whiteSpace: 'nowrap',
                zIndex: '10',
                opacity: '0',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                pointerEvents: 'none'
            });

            card.style.position = 'relative'; // 親要素の基準位置を確保
            card.appendChild(tooltip);

            // アニメーション表示
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);

            // 5秒後に自動的に消える
            setTimeout(() => {
                if (tooltip && tooltip.parentElement) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateX(-50%) translateY(10px)';
                    setTimeout(() => tooltip.remove(), 300);
                }
            }, 5000);
        });
    });
});
