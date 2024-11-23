import { useState } from 'react';
import { FaPaperPlane, FaSpinner, FaCloudUploadAlt } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Source {
	text: string;
	src: string;
}

interface QueryResult {
	response: string;
	sources: Source[];
}

function Query() {
	const [question, setQuestion] = useState('');
	const [results, setResults] = useState<QueryResult | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setResults({
				response: "Here's your answer...",
				sources: [
					{
						text: "Reference text example",
						src: "example_image.jpg"
					}
				]
			});
			setIsLoading(false);
		}, 1500);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-4xl mx-auto p-4 sm:p-6 relative" // Added relative positioning and adjusted padding
		>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="text-center sm:text-left w-full sm:w-auto mb-4 sm:mb-0" // Modified for mobile
				>
					<h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">Ask Me Anything</h2>
					<p className="text-gray-600">What would you like to know?</p>
				</motion.div>

				<Link to="/upload" className="w-full sm:w-auto"> {/* Modified for mobile */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-md w-full sm:w-auto justify-center sm:justify-start" // Modified for mobile
					>
						<FaCloudUploadAlt className="text-xl" />
						Upload Content
					</motion.button>
				</Link>
			</div>

			{/* Form Section */}
			<motion.form
				onSubmit={handleSubmit}
				className="mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="relative">
					<textarea
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all min-h-[120px] text-gray-700 resize-none shadow-sm"
						placeholder="Type your question here..."
					/>
					<motion.button
						type="submit"
						disabled={!question.trim() || isLoading}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`absolute bottom-4 right-4 px-4 sm:px-6 py-2 rounded-full ${question.trim() && !isLoading
							? 'bg-purple-600 hover:bg-purple-700'
							: 'bg-purple-300'
							} text-white transition-colors duration-200 flex items-center gap-2 shadow-md text-sm sm:text-base`} // Added responsive text
					>
						{isLoading ? (
							<>
								<FaSpinner className="animate-spin" />
								<span className="hidden sm:inline">Thinking...</span> {/* Hide text on mobile */}
							</>
						) : (
							<>
								<FaPaperPlane />
								<span className="hidden sm:inline">Submit</span> {/* Hide text on mobile */}
							</>
						)}
					</motion.button>
				</div>
			</motion.form>

			{/* Results Section */}
			<AnimatePresence>
				{results && (
					<motion.div
						className="space-y-4 sm:space-y-6" // Adjusted spacing
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
							whileHover={{ y: -2 }}
						>
							<h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-4">Answer</h3>
							<p className="text-gray-700 leading-relaxed">{results.response}</p>
						</motion.div>

						{results.sources.length > 0 && (
							<motion.div
								className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
								whileHover={{ y: -2 }}
							>
								<h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
									<IoDocumentTextOutline />
									Sources
								</h3>
								<div className="space-y-4">
									{results.sources.map((source, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.1 }}
											className="p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
										>
											<p className="text-gray-700 mb-2 text-sm sm:text-base">{source.text}</p>
											<motion.img
												src={source.src}
												alt={`Source ${index + 1}`}
												className="max-w-full h-auto rounded-md shadow-md"
												whileHover={{ scale: 1.02 }}
												transition={{ duration: 0.2 }}
											/>
										</motion.div>
									))}
								</div>
							</motion.div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
export default Query;