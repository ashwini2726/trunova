import React, { useEffect, useState } from 'react';

const MaintenanceQuestions = () => {
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update the path with your actual JSON file location
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/path/to/your/maintenanceQuestions.json'); // Update this path to your JSON file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error('Error fetching question data:', error);
        setError('Failed to load questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (questionData.length === 0) return <p>No questions available.</p>;

  return (
    <div>
      <h2>Maintenance Questions</h2>
      {questionData.map((item, index) => (
        <div key={index} className="question-item">
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceQuestions;
