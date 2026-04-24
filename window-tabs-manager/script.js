function initWindowToggles() {
    const windowItems = document.querySelectorAll('.window-item');
    
    windowItems.forEach(windowItem => {
        const windowHeader = windowItem.querySelector('.window-header');
        
        windowHeader.addEventListener('click', function(e) {
            if (!e.target.closest('.toggle-btn')) {
                toggleWindow(windowItem);
            }
        });
        
        const toggleBtn = windowItem.querySelector('.toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                toggleWindow(windowItem);
            });
        }
    });
}

function toggleWindow(windowItem) {
    windowItem.classList.toggle('collapsed');
    
    const tabsList = windowItem.querySelector('.tabs-list');
    if (tabsList) {
        if (windowItem.classList.contains('collapsed')) {
            tabsList.style.maxHeight = '0';
        } else {
            tabsList.style.maxHeight = tabsList.scrollHeight + 'px';
        }
    }
}

function initTabSelection() {
    const allTabs = document.querySelectorAll('.tab-item');
    
    allTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            if (!e.target.closest('.tab-close')) {
                selectTab(tab);
            }
        });
    });
}

function selectTab(selectedTab) {
    const windowItem = selectedTab.closest('.window-item');
    if (!windowItem) return;
    
    const siblingTabs = windowItem.querySelectorAll('.tab-item');
    siblingTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    selectedTab.classList.add('active');
    
    activateWindow(windowItem);
}

function initWindowActivation() {
    const windowItems = document.querySelectorAll('.window-item');
    
    windowItems.forEach(windowItem => {
        windowItem.addEventListener('click', function(e) {
            if (e.target.closest('.window-header') || e.target.closest('.tab-item')) {
                activateWindow(windowItem);
            }
        });
    });
}

function activateWindow(selectedWindow) {
    const allWindows = document.querySelectorAll('.window-item');
    allWindows.forEach(window => {
        window.classList.remove('active');
    });
    
    selectedWindow.classList.add('active');
}

function initTabClose() {
    const closeButtons = document.querySelectorAll('.tab-close');
    
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeTab(this.closest('.tab-item'));
        });
    });
}

function closeTab(tabItem) {
    if (!tabItem) return;
    
    const windowItem = tabItem.closest('.window-item');
    if (!windowItem) return;
    
    if (tabItem.classList.contains('active')) {
        const nextTab = tabItem.nextElementSibling || tabItem.previousElementSibling;
        if (nextTab) {
            selectTab(nextTab);
        }
    }
    
    tabItem.style.animation = 'none';
    tabItem.offsetHeight;
    
    tabItem.style.opacity = '0';
    tabItem.style.transform = 'translateX(20px)';
    tabItem.style.transition = 'all 0.2s ease';
    
    setTimeout(() => {
        tabItem.style.height = tabItem.offsetHeight + 'px';
        tabItem.style.margin = '0';
        tabItem.style.padding = '0';
        tabItem.style.border = 'none';
        
        setTimeout(() => {
            tabItem.style.height = '0';
            tabItem.style.overflow = 'hidden';
            
            setTimeout(() => {
                tabItem.remove();
                updateWindowTabsCount(windowItem);
                updateStats();
                
                const remainingTabs = windowItem.querySelectorAll('.tab-item');
                if (remainingTabs.length > 0) {
                    const activeTab = windowItem.querySelector('.tab-item.active');
                    if (!activeTab) {
                        selectTab(remainingTabs[0]);
                    }
                }
            }, 200);
        }, 50);
    }, 200);
}

function updateWindowTabsCount(windowItem) {
    const tabsCount = windowItem.querySelectorAll('.tab-item').length;
    const countElement = windowItem.querySelector('.window-tabs-count');
    
    if (countElement) {
        countElement.textContent = `${tabsCount} 个标签页`;
    }
}

function updateStats() {
    const windowCount = document.querySelectorAll('.window-item').length;
    const tabCount = document.querySelectorAll('.tab-item').length;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) {
        statNumbers[0].textContent = windowCount;
    }
    if (statNumbers[1]) {
        statNumbers[1].textContent = tabCount;
    }
}

function initScrollSync() {
    const tabsLists = document.querySelectorAll('.tabs-list');
    tabsLists.forEach(list => {
        list.addEventListener('scroll', function() {
            if (this.scrollHeight > this.clientHeight) {
                this.style.boxShadow = 'inset 0 -4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const activeTab = document.querySelector('.tab-item.active');
            if (!activeTab) return;
            
            const windowItem = activeTab.closest('.window-item');
            if (!windowItem) return;
            
            const tabs = Array.from(windowItem.querySelectorAll('.tab-item'));
            const currentIndex = tabs.indexOf(activeTab);
            
            let newIndex;
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                newIndex = currentIndex - 1;
            } else if (e.key === 'ArrowDown' && currentIndex < tabs.length - 1) {
                newIndex = currentIndex + 1;
            }
            
            if (newIndex !== undefined) {
                e.preventDefault();
                selectTab(tabs[newIndex]);
                tabs[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        if (e.key === 'Enter' || e.key === ' ') {
            const activeTab = document.querySelector('.tab-item.active');
            if (activeTab && document.activeElement === activeTab) {
                e.preventDefault();
                console.log('Tab activated:', activeTab.querySelector('.tab-title')?.textContent);
            }
        }
        
        if (e.key === 'Delete' || e.key === 'Backspace') {
            const activeTab = document.querySelector('.tab-item.active');
            if (activeTab) {
                const focusedElement = document.activeElement;
                if (focusedElement === activeTab || activeTab.contains(focusedElement)) {
                    e.preventDefault();
                    closeTab(activeTab);
                }
            }
        }
    });
}

function makeTabsFocusable() {
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'option');
        
        tab.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        tab.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initWindowToggles();
    initTabSelection();
    initTabClose();
    initWindowActivation();
    initScrollSync();
    addKeyboardNavigation();
    makeTabsFocusable();
    updateStats();
});
