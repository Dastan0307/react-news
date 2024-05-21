var subsets = function(nums) {
	const result = [];
	
	// Функция для обратной трассировки
	const backtrack = (start, currentSubset) => {
			result.push(currentSubset.slice());
			console.log('start', start);
			
			// Рекурсивно идем по элементам массива, начиная с индекса start
			for (let i = start; i < nums.length; i++) {
					// Добавляем текущий элемент к текущему подмножеству
					currentSubset.push(nums[i]);
					// Рекурсивно вызываем backtrack для следующего элемента
					backtrack(i + 1, currentSubset);
					// Убираем последний добавленный элемент, чтобы вернуться к предыдущему состоянию
					currentSubset.pop();
			}
	};
	
	// Начинаем с пустого подмножества, начиная с 0-го индекса
	backtrack(0, []);
	
	return result;
};

// Пример использования
const nums = [1, 2, 3];
console.log(subsets(nums));
