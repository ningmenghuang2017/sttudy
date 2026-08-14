/* ===========================
   BREAK ACTIVITIES WINDOW MANAGEMENT
   =========================== */

let breakWindow = null;

function openBreakFile() {
    // Close any existing break window
    if (breakWindow && !breakWindow.closed) {
        breakWindow.close();
    }
    
    // Open the break activities file
    breakWindow = window.open('hhhhhhhhhhhhh.html', 'break-window', 'width=800,height=600');
    
    // Auto-close the window after 5 minutes (300,000 milliseconds)
    setTimeout(function() {
        if (breakWindow && !breakWindow.closed) {
            breakWindow.close();
        }
    }, 300000);
}
