interface ScoreCircleProps {
  score: number;
  label: string;
  status: 'good' | 'warning' | 'danger';
  color?: string;
}

export default function ScoreCircle({ score, label, status, color }: ScoreCircleProps) {
  // Calculate the stroke offset for the circle (circumference - value * circumference)
  const circumference = 339.3; // 2 * π * radius (54)
  const strokeOffset = ((100 - score) / 100) * circumference;
  
  // Determine the color based on status
  let statusColor = "";
  let statusBg = "";
  
  switch (status) {
    case 'good':
      statusColor = color || "text-secondary";
      statusBg = "bg-secondary/10 text-secondary";
      break;
    case 'warning':
      statusColor = color || "text-warning";
      statusBg = "bg-warning/10 text-warning";
      break;
    case 'danger':
      statusColor = color || "text-danger";
      statusBg = "bg-danger/10 text-danger";
      break;
    default:
      statusColor = color || "text-primary";
      statusBg = "bg-primary/10 text-primary";
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg card-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-darkText dark:text-white">{label}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusBg}`}>
          {status === 'good' ? 'Good' : status === 'warning' ? 'Needs Improvement' : 'Critical'}
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 score-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" className="dark:stroke-gray-700" />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="12" 
              strokeDasharray="339.3" 
              strokeDashoffset={strokeOffset} 
              className={statusColor}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-darkText dark:text-white">{score}</span>
            <span className="text-lg text-gray-500 dark:text-gray-400">/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
