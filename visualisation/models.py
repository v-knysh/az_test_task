import xlrd


if __name__ == "__main__":
    book = xlrd.open_workbook('titanic_data_set.xls')
    sheet = book.sheet_by_index(0)
    keys = sheet.row_values(0)
    keys = [key.replace('.', '_') for key in keys]
    zipped = [dict(zip(keys, sheet.row_values(i))) for i in range(1, sheet.nrows)]
    # tp_dict = [{key: value or None for key, value in d.items()} for d in zipped]
    for d in zipped:
        for key in d:
            if d[key] == '':
                d[key] = None






