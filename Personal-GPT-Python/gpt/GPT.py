from llama_index import StorageContext, load_index_from_storage, SimpleDirectoryReader, GPTVectorStoreIndex
import os
from werkzeug.utils import secure_filename

class GPTService:
    KB = 'knowledge-base'

    def __init__(self):
        pass  # Removed loading indices in init

    def load_index(self, index_name):
        storage_path = os.path.join(self.KB, index_name)
        # if os.path.exists(storage_path):
            # rebuild storage context
        storage_context = StorageContext.from_defaults(persist_dir=storage_path)
        # load index
        index = load_index_from_storage(storage_context)
        return index  # Load the index
        # else:
        #     return None

    def query(self, queryString, index_name):  # Added index_name as parameter
        index = self.load_index(index_name)  # Load the required index
        queryEngine = index.as_query_engine()
        return queryEngine.query(queryString)

    def insert_file(self, file):
        filename = secure_filename(file.filename)
        file_dir = os.path.join(self.KB, filename)
        if not os.path.exists(file_dir):
            os.mkdir(file_dir)  # Create a new directory for the file

        filepath = os.path.join(file_dir, filename)
        file.save(filepath)
        document = SimpleDirectoryReader(file_dir).load_data()
        index = GPTVectorStoreIndex.from_documents(document)  # Store new index
        # create storage context
        # storage_context = StorageContext.from_defaults(persist_dir=file_dir)
        # index.storage_context = storage_context
        index.storage_context.persist(file_dir)  # Save index to disk

    def get_file_name(self):
        return os.listdir(self.KB)  # Return list of directories (indices)
