/* ===========================
   STUDY PLANNER - JAVASCRIPT
   =========================== */

// Load plans from browser storage when page loads
document.addEventListener('DOMContentLoaded', loadPlans);

// Global variable to store the plan being edited
let currentEditPlan = null;
let currentEditWeek = null;
let currentEditDay = null;

/* ===========================
   CREATE PLAN FUNCTION
   Handles form submission and creates new study plan
   =========================== */
function createPlan(event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const planName = document.getElementById('plan-name').value;
    const weeksInput = document.getElementById('weeks').value;
    
    // Get selected subjects
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
    const subjects = Array.from(subjectCheckboxes).map(cb => cb.value);

    // Validate that at least one subject is selected
    if (subjects.length === 0) {
        alert('Please select at least one subject!');
        return;
    }

    // Create weekly schedule
    const schedule = {};
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayTopics = {
        'Monday': '🔵 VERBAL WORD DAY',
        'Tuesday': '🟢 READING DAY',
        'Wednesday': '🟡 MATH DAY',
        'Thursday': '🟣 ANALOGIES DAY',
        'Friday': '🟠 MIXED DAY',
        'Saturday': '🔴 MINI SSAT',
        'Sunday': '⚫ REST DAY'
    };

    for (let week = 1; week <= parseInt(weeksInput); week++) {
        schedule[`Week ${week}`] = {};
        daysOfWeek.forEach(day => {
            schedule[`Week ${week}`][day] = {
                topic: dayTopics[day],
                chunks: [
                    { duration: '10-12 min', activity: '', status: 'Not Started' },
                    { duration: '3-5 min', activity: '🍪 Break', status: 'Break' },
                    { duration: '10-12 min', activity: '', status: 'Not Started' },
                    { duration: '3-5 min', activity: '🍪 Break', status: 'Break' },
                    { duration: '5-10 min', activity: '', status: 'Not Started' }
                ],
                weekComplete: false
            };
        });
    }

    // Create plan object
    const plan = {
        id: Date.now(),
        name: planName,
        weeks: parseInt(weeksInput),
        subjects: subjects,
        createdDate: new Date().toLocaleDateString(),
        progress: 0,
        schedule: schedule
    };

    // Save plan to browser storage
    savePlan(plan);

    // Clear form
    document.querySelector('.plan-form').reset();

    // Show success message
    alert('✅ Study plan created successfully!');

    // Reload plans display
    loadPlans();

    // Scroll to my plans section
    scrollToSection('my-plans');
}

/* ===========================
   SAVE PLAN TO LOCAL STORAGE
   =========================== */
function savePlan(plan) {
    let plans = localStorage.getItem('studyPlans');
    plans = plans ? JSON.parse(plans) : [];
    plans.push(plan);
    localStorage.setItem('studyPlans', JSON.stringify(plans));
}

/* ===========================
   LOAD AND DISPLAY ALL PLANS
   =========================== */
function loadPlans() {
    let plans = localStorage.getItem('studyPlans');
    plans = plans ? JSON.parse(plans) : [];

    const plansList = document.getElementById('plans-list');
    plansList.innerHTML = '';

    if (plans.length === 0) {
        plansList.innerHTML = '<p class="empty-message">No plans yet. Create your first plan above! ⬆️</p>';
        return;
    }

    plans.forEach(plan => {
        const planCard = createPlanCard(plan);
        plansList.appendChild(planCard);
    });
}

/* ===========================
   CREATE PLAN CARD ELEMENT
   =========================== */
function createPlanCard(plan) {
    const card = document.createElement('div');
    card.className = 'plan-card';

    const subjectTags = plan.subjects
        .map(subject => `<span class="subject-tag">${subject}</span>`)
        .join('');

    card.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="plan-info">
            <strong>📅 Created:</strong> ${plan.createdDate}<br>
            <strong>⏱️ Duration:</strong> ${plan.weeks} weeks
        </div>
        <div class="plan-subjects">
            <strong>📚 Subjects:</strong><br>
            ${subjectTags}
        </div>
        <div>
            <strong>Progress:</strong>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${plan.progress}%"></div>
            </div>
            <span>${plan.progress}% Complete</span>
        </div>
        <div class="plan-buttons">
            <button class="btn btn-small btn-edit" onclick="editPlanSchedule(${plan.id})">📅 Weekly Schedule</button>
            <button class="btn btn-small btn-delete" onclick="deletePlan(${plan.id})">🗑️ Delete</button>
        </div>
    `;

    return card;
}

/* ===========================
   OPEN SCHEDULE EDITOR
   =========================== */
function editPlanSchedule(planId) {
    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
        alert('Plan not found!');
        return;
    }

    currentEditPlan = plan;
    currentEditWeek = `Week 1`;

    document.getElementById('schedule-title').textContent = `Edit Weekly Schedule: ${plan.name}`;

    // Create week tabs
    createWeekTabs(plan.weeks);

    // Show first week
    showWeekSchedule(`Week 1`);

    document.getElementById('schedule-modal').style.display = 'block';
}

/* ===========================
   CREATE WEEK TABS
   =========================== */
function createWeekTabs(totalWeeks) {
    const tabsContainer = document.getElementById('subject-tabs');
    tabsContainer.innerHTML = '';

    for (let i = 1; i <= totalWeeks; i++) {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'subject-tab' + (i === 1 ? ' active' : '');
        tab.textContent = `Week ${i}`;
        tab.onclick = () => switchWeek(`Week ${i}`);
        tabsContainer.appendChild(tab);
    }
}

/* ===========================
   SWITCH WEEK
   =========================== */
function switchWeek(week) {
    currentEditWeek = week;

    const tabs = document.querySelectorAll('.subject-tab');
    tabs.forEach(tab => {
        if (tab.textContent === week) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    showWeekSchedule(week);
}

/* ===========================
   SHOW WEEK SCHEDULE
   =========================== */
function showWeekSchedule(week) {
    const weekData = currentEditPlan.schedule[week];
    const container = document.getElementById('schedule-container');
    
    let html = `<div class="week-schedule">`;
    
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    daysOfWeek.forEach(day => {
        const dayData = weekData[day];
        html += `
            <div class="day-card">
                <div class="day-header">
                    <h3>${dayData.topic}</h3>
                    <span class="day-name">${day}</span>
                </div>
                <div class="day-body">
                    <button class="btn btn-small btn-edit-day" onclick="editDaySchedule('${week}', '${day}')">
                        ✏️ Edit Schedule
                    </button>
                </div>
                <div class="day-footer">
                    <label class="day-complete">
                        <input type="checkbox" ${dayData.weekComplete ? 'checked' : ''} 
                            data-week="${week}" data-day="${day}" onchange="updateDayComplete(this)">
                        <span>Day Complete</span>
                    </label>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

/* ===========================
   EDIT DAY SCHEDULE - Opens Spreadsheet
   =========================== */
function editDaySchedule(week, day) {
    currentEditWeek = week;
    currentEditDay = day;
    
    const dayData = currentEditPlan.schedule[week][day];
    
    document.getElementById('day-schedule-title').textContent = `Edit ${day} Schedule`;
    
    // Create Excel-style table
    createDaySpreadsheet(dayData);
    
    document.getElementById('day-schedule-modal').style.display = 'block';
}

/* ===========================
   CREATE DAY SPREADSHEET
   =========================== */
function createDaySpreadsheet(dayData) {
    const container = document.getElementById('day-schedule-container');
    
    const wrapper = document.createElement('div');
    wrapper.className = 'excel-wrapper';
    
    const table = document.createElement('table');
    table.className = 'excel-spreadsheet';
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    
    const headers = ['Duration', 'Activity/Topic', 'Status'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.className = 'excel-header';
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Data rows
    const tbody = document.createElement('tbody');
    dayData.chunks.forEach((chunk, index) => {
        const row = document.createElement('tr');
        row.className = 'excel-row';
        
        // Duration cell
        const durationCell = document.createElement('td');
        durationCell.className = 'excel-cell';
        const durationInput = document.createElement('input');
        durationInput.type = 'text';
        durationInput.className = 'excel-input';
        durationInput.value = chunk.duration;
        durationInput.dataset.chunkIndex = index;
        durationInput.onchange = () => updateChunk(index, 'duration', durationInput.value);
        durationCell.appendChild(durationInput);
        row.appendChild(durationCell);
        
        // Activity cell
        const activityCell = document.createElement('td');
        activityCell.className = 'excel-cell';
        const activityInput = document.createElement('input');
        activityInput.type = 'text';
        activityInput.className = 'excel-input';
        activityInput.value = chunk.activity;
        activityInput.placeholder = 'e.g., Vocabulary, 🍪 Break, Math Problems';
        activityInput.dataset.chunkIndex = index;
        activityInput.onchange = () => updateChunk(index, 'activity', activityInput.value);
        activityCell.appendChild(activityInput);
        row.appendChild(activityCell);
        
        // Status cell
        const statusCell = document.createElement('td');
        statusCell.className = 'excel-cell';
        const statusSelect = document.createElement('select');
        statusSelect.className = 'excel-select';
        statusSelect.dataset.chunkIndex = index;
        
        const options = [
            { value: 'Not Started', text: 'Not Started' },
            { value: 'In Progress', text: 'In Progress' },
            { value: 'Completed', text: '✓ Completed' },
            { value: 'Break', text: '🍪 Break' }
        ];
        
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            if (opt.value === chunk.status) option.selected = true;
            statusSelect.appendChild(option);
        });
        
        statusSelect.onchange = () => updateChunk(index, 'status', statusSelect.value);
        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);
        
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);
}

/* ===========================
   UPDATE CHUNK
   =========================== */
function updateChunk(index, field, value) {
    const chunk = currentEditPlan.schedule[currentEditWeek][currentEditDay].chunks[index];
    chunk[field] = value;
}

/* ===========================
   UPDATE DAY COMPLETE
   =========================== */
function updateDayComplete(checkbox) {
    const week = checkbox.getAttribute('data-week');
    const day = checkbox.getAttribute('data-day');
    currentEditPlan.schedule[week][day].weekComplete = checkbox.checked;
}

/* ===========================
   SAVE DAY SCHEDULE
   =========================== */
function saveDaySchedule() {
    closeDayScheduleModal();
    alert('✅ Day schedule saved!');
}

/* ===========================
   CLOSE DAY SCHEDULE MODAL
   =========================== */
function closeDayScheduleModal() {
    document.getElementById('day-schedule-modal').style.display = 'none';
    currentEditDay = null;
}

/* ===========================
   SAVE SCHEDULE
   =========================== */
function saveSchedule() {
    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    const planIndex = plans.findIndex(p => p.id === currentEditPlan.id);
    if (planIndex !== -1) {
        plans[planIndex] = currentEditPlan;
        localStorage.setItem('studyPlans', JSON.stringify(plans));
    }

    closeScheduleModal();
    loadPlans();
    alert('✅ Schedule saved successfully!');
}

/* ===========================
   CLOSE SCHEDULE MODAL
   =========================== */
function closeScheduleModal() {
    document.getElementById('schedule-modal').style.display = 'none';
    currentEditPlan = null;
    currentEditWeek = null;
}

/* ===========================
   DELETE PLAN FUNCTION
   =========================== */
function deletePlan(planId) {
    if (!confirm('Are you sure you want to delete this plan?')) {
        return;
    }

    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    plans = plans.filter(p => p.id !== planId);
    localStorage.setItem('studyPlans', JSON.stringify(plans));

    loadPlans();
    alert('✅ Plan deleted!');
}

/* ===========================
   SCROLL TO SECTION FUNCTION
   =========================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ===========================
   CLOSE MODAL ON OUTSIDE CLICK
   =========================== */
window.onclick = function(event) {
    const modal = document.getElementById('schedule-modal');
    const dayModal = document.getElementById('day-schedule-modal');
    if (event.target === modal) {
        closeScheduleModal();
    }
    if (event.target === dayModal) {
        closeDayScheduleModal();
    }
}
