const schedule = [
    ["Time Slot", "Dr. John", "Dr. Jane", "Dr. Smith"],
    ["09:00 - 10:00", {
        patient: {
            name: "John Doe",
            contact: "5555555555"
        }
    }, null, { leave: { reason: "Personal leave" } }],
    ["10:00 - 11:00", null, { patient: { name: "Jane Roe", contact: "6666666666" } }, null],
    ["11:00 - 12:00", null, { leave: { reason: "Sick leave" } }, { patient: { name: "Alice Smith", contact: "7777777777" } }]
];


// Time Slot	    Dr. John	                            Dr. Jane	                            Dr. Smith
// 09:00 - 10:00	Patient: John Doe
//                 Contact: 5555555555	                    No Activity	                            On Leave
//                                                                                                 Reason: Personal leave
// 10:00 - 11:00	No Activity	                            Patient: Jane Roe
//                                                         Contact: 6666666666	No Activity


// 11:00 - 12:00	No Activity	                            On Leave
//                                                         Reason: Sick leave	                    Patient: Alice Smith
//                                                                                                 Contact: 7777777777
