function getAvailableSlots({hourStart, hourEnd, bookedSlots}) {
    // Convert time to minutes for easier calculations
    
    function timeToMinutes(time) {
        
        const [hours, minutes] = time?.split(':')?.map(Number);
       
        return hours * 60 + minutes;
    }

    function minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const mins = (minutes % 60).toString().padStart(2, '0');
        return `${hours}:${mins}`;
    }

    const hourStartMinutes = timeToMinutes(hourStart);
    const hourEndMinutes = timeToMinutes(hourEnd);

    const bookedIntervals = bookedSlots.map(slot => ({
        from: timeToMinutes(slot.slotFrom),
        to: timeToMinutes(slot.slotTo)
    }));
 
    bookedIntervals.sort((a, b) => a.from - b.from);

    const availableSlots = [];
    let currentTime = hourStartMinutes;

    for (const { from, to } of bookedIntervals) {
     
        if (currentTime < from) {
            availableSlots.push({
                slotFrom: minutesToTime(currentTime),
                slotTo: minutesToTime(from)
            });
        }
       
        currentTime = Math.max(currentTime, to);
    }

    // Check for gap after the last booked slot
    if (currentTime < hourEndMinutes) {
        availableSlots.push({
            slotFrom: minutesToTime(currentTime),
            slotTo: minutesToTime(hourEndMinutes)
        });
    }

    return availableSlots;
}

// Example usage
const bookedSlots = [{ slotFrom: '14:00', slotTo: '14:20' },{ slotFrom: '14:30', slotTo: '14:35' }];
const hourStart = '14:00';
const hourEnd = '15:00';

module.exports = getAvailableSlots 
