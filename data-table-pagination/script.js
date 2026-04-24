document.addEventListener('DOMContentLoaded', function() {
    // 配置项
    const config = {
        pageSize: 10,
        totalData: 100
    };
    
    // 状态管理
    let state = {
        currentPage: 1,
        pageSize: config.pageSize,
        dateFrom: null,
        dateTo: null,
        filteredData: []
    };
    
    // 数据类型和状态选项
    const dataTypes = ['类型A', '类型B', '类型C', '类型D', '类型E'];
    const statuses = ['active', 'pending', 'inactive'];
    const statusLabels = {
        active: '激活',
        pending: '待处理',
        inactive: '禁用'
    };
    
    // 生成模拟数据
    function generateMockData() {
        const data = [];
        const today = new Date();
        
        for (let i = 1; i <= config.totalData; i++) {
            const randomDays = Math.floor(Math.random() * 365);
            const date = new Date(today);
            date.setDate(date.getDate() - randomDays);
            
            data.push({
                id: i,
                name: `数据项 ${i}`,
                type: dataTypes[Math.floor(Math.random() * dataTypes.length)],
                createTime: formatDate(date),
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }
        
        return data;
    }
    
    // 格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // 解析日期字符串为Date对象
    function parseDate(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('-');
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    
    // 过滤数据
    function filterData() {
        let filtered = [...mockData];
        
        // 按日期范围过滤
        if (state.dateFrom) {
            const fromDate = parseDate(state.dateFrom);
            filtered = filtered.filter(item => {
                const itemDate = parseDate(item.createTime);
                return itemDate >= fromDate;
            });
        }
        
        if (state.dateTo) {
            const toDate = parseDate(state.dateTo);
            filtered = filtered.filter(item => {
                const itemDate = parseDate(item.createTime);
                return itemDate <= toDate;
            });
        }
        
        state.filteredData = filtered;
        state.currentPage = 1; // 重置到第一页
        updateTable();
        updatePagination();
    }
    
    // 获取当前页数据
    function getCurrentPageData() {
        const startIndex = (state.currentPage - 1) * state.pageSize;
        const endIndex = startIndex + state.pageSize;
        return state.filteredData.slice(startIndex, endIndex);
    }
    
    // 计算总页数
    function getTotalPages() {
        return Math.ceil(state.filteredData.length / state.pageSize);
    }
    
    // 更新表格
    function updateTable() {
        const tableBody = document.getElementById('table-body');
        const currentPageData = getCurrentPageData();
        
        const fragment = document.createDocumentFragment();
        
        if (currentPageData.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 40px; color: #6c757d;">
                    暂无数据
                </td>
            `;
            fragment.appendChild(emptyRow);
        } else {
            currentPageData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.createTime}</td>
                    <td>
                        <span class="status status-${item.status}">
                            ${statusLabels[item.status]}
                        </span>
                    </td>
                    <td>
                        <button class="action-btn view-btn" data-id="${item.id}">查看</button>
                        <button class="action-btn edit-btn" data-id="${item.id}">编辑</button>
                    </td>
                `;
                fragment.appendChild(row);
            });
        }
        
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);
    }
    
    // 更新分页控件
    function updatePagination() {
        const totalCount = state.filteredData.length;
        const totalPages = getTotalPages();
        
        // 更新页码信息
        document.getElementById('total-count').textContent = totalCount;
        document.getElementById('current-page').textContent = state.currentPage;
        
        // 更新按钮状态
        document.getElementById('first-page').disabled = state.currentPage === 1;
        document.getElementById('prev-page').disabled = state.currentPage === 1;
        document.getElementById('next-page').disabled = state.currentPage === totalPages || totalPages === 0;
        document.getElementById('last-page').disabled = state.currentPage === totalPages || totalPages === 0;
        
        // 更新页码按钮
        const pageNumbers = document.getElementById('page-numbers');
        const fragment = document.createDocumentFragment();
        
        if (totalPages > 0) {
            const maxVisiblePages = 5;
            let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number-btn ${i === state.currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.dataset.page = i;
                fragment.appendChild(pageBtn);
            }
        }
        
        pageNumbers.innerHTML = '';
        pageNumbers.appendChild(fragment);
    }
    
    // 跳转到指定页
    function goToPage(page) {
        const totalPages = getTotalPages();
        if (page < 1 || page > totalPages) return;
        
        state.currentPage = page;
        updateTable();
        updatePagination();
    }
    
    // 首页
    function goToFirstPage() {
        goToPage(1);
    }
    
    // 上一页
    function goToPrevPage() {
        goToPage(state.currentPage - 1);
    }
    
    // 下一页
    function goToNextPage() {
        goToPage(state.currentPage + 1);
    }
    
    // 末页
    function goToLastPage() {
        goToPage(getTotalPages());
    }
    
    // 事件委托处理函数
    function handleDocumentClick(e) {
        const target = e.target;
        
        // 处理页码按钮点击
        if (target.classList.contains('page-number-btn')) {
            const page = parseInt(target.dataset.page);
            if (!isNaN(page)) {
                goToPage(page);
            }
        }
        
        // 处理查看按钮点击
        if (target.classList.contains('view-btn')) {
            const id = target.getAttribute('data-id');
            const item = state.filteredData.find(data => data.id === parseInt(id));
            if (item) {
                alert(`查看数据项 ID: ${item.id}\n名称: ${item.name}\n类型: ${item.type}\n创建时间: ${item.createTime}\n状态: ${statusLabels[item.status]}`);
            }
        }
        
        // 处理编辑按钮点击
        if (target.classList.contains('edit-btn')) {
            const id = target.getAttribute('data-id');
            alert(`编辑数据项 ID: ${id}`);
        }
    }
    
    // 初始化事件监听
    function initEventListeners() {
        // 分页按钮
        document.getElementById('first-page').addEventListener('click', goToFirstPage);
        document.getElementById('prev-page').addEventListener('click', goToPrevPage);
        document.getElementById('next-page').addEventListener('click', goToNextPage);
        document.getElementById('last-page').addEventListener('click', goToLastPage);
        
        // 每页显示数量
        document.getElementById('page-size').addEventListener('change', function() {
            state.pageSize = parseInt(this.value);
            state.currentPage = 1;
            updateTable();
            updatePagination();
        });
        
        // 筛选按钮
        document.getElementById('apply-filter').addEventListener('click', function() {
            state.dateFrom = document.getElementById('date-from').value || null;
            state.dateTo = document.getElementById('date-to').value || null;
            filterData();
        });
        
        // 重置按钮
        document.getElementById('reset-filter').addEventListener('click', function() {
            document.getElementById('date-from').value = '';
            document.getElementById('date-to').value = '';
            state.dateFrom = null;
            state.dateTo = null;
            filterData();
        });
        
        // 事件委托
        document.addEventListener('click', handleDocumentClick);
    }
    
    // 初始化
    function init() {
        // 生成模拟数据
        mockData = generateMockData();
        state.filteredData = [...mockData];
        
        // 初始化事件监听
        initEventListeners();
        
        // 更新表格和分页
        updateTable();
        updatePagination();
    }
    
    // 启动应用
    let mockData;
    init();
});
