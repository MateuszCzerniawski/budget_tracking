import os.path

import pandas as pd


class Explorer:
    def __init__(self):
        self._users_path = "data/users.csv"
        self._users_logins = pd.read_csv(self._users_path)
        self._expenses = dict()
        for user in self._users_logins["login"]:
            path = Explorer._user_path(user)
            if os.path.exists(path):
                self._expenses[user] = pd.read_csv(path)

    @staticmethod
    def _user_path(user: str):
        return f"data/users/{user}.csv"

    def get_user(self, login: str, password: str) -> bool:
        for i, row in self._users_logins.iterrows():
            l, p = row["login"], row["password"]
            if login == l and password == p:
                return True
        return False

    def register_user(self, login: str, password: str) -> bool:
        if self.user_exists(login):
            return False
        self._users_logins.loc[len(self._users_logins)] = {"login": login, "password": password}
        self._users_logins.to_csv(self._users_path, index=False)
        return True

    def expenses(self, user: str):
        expenses = {
            "Basic": [],
            "Transport": [],
            "Household": [],
            "Health": [],
            "Leisure & travel": [],
            "Other": []
        }
        if user not in self._expenses:
            return expenses
        for i, exp in self._expenses[user].iterrows():
            expenses[exp["category"]].append({
                "title": exp["title"],
                "day": exp["day"],
                "month": exp["month"],
                "year": exp["year"],
                "hour": exp["hour"],
                "minute": exp["minute"],
                "count": exp["count"],
            })
        return expenses

    def user_exists(self, user: str):
        return user in {l for l in self._users_logins["login"]}

    def _save_exp(self, user: str, data: pd.DataFrame):
        path = Explorer._user_path(user)
        data.to_csv(path, index=False)
        self._expenses[user] = pd.read_csv(path)

    def _get_exp(self, user: str, title: str, category: str, hour: int, minute: int, day: int, month: int, year: int,
                 count: float) -> pd.DataFrame:
        if not user in self._expenses:
            return None
        try:
            exp = self._expenses[user]
            exp = exp[exp["title"] == title]
            exp = exp[exp["category"] == category]
            exp = exp[exp["hour"] == hour]
            exp = exp[exp["minute"] == minute]
            exp = exp[exp["day"] == day]
            exp = exp[exp["month"] == month]
            exp = exp[exp["year"] == year]
            exp = exp[exp["count"] == count]
            return exp
        except Exception as e:
            print(e)
            return None

    def del_exp(self, user: str, title: str, category: str, hour: int, minute: int, day: int, month: int, year: int,
                count: float) -> bool:
        if not user in self._expenses:
            return False
        try:
            exp = self._expenses[user]
            exp = exp.drop(self._get_exp(user, title, category, hour, minute, day, month, year, count).index)
            self._save_exp(user, exp)
            return True
        except Exception as e:
            print(e)
            return False

    def add_exp(self, user: str, title: str, category: str, hour: int, minute: int, day: int, month: int, year: int,
                count: float) -> bool:
        if not self.user_exists(user):
            return False
        entry = {
            "title": title,
            "category": category,
            "day": day,
            "month": month,
            "year": year,
            "hour": hour,
            "minute": minute,
            "count": count,
        }
        if user in self._expenses:
            exp = self._expenses[user]
            exp.loc[len(exp)] = entry
        else:
            exp = pd.DataFrame({k: [v] for k, v in entry.items()})
        self._save_exp(user, exp)
        return True

    def edit_exp(self, user: str, old_title: str, old_category: str, old_hour: int, old_minute: int, old_day: int,
                 old_month: int, old_year: int,
                 old_count: float, new_title: str, new_category: str, new_hour: int, new_minute: int, new_day: int,
                 new_month: int, new_year: int,
                 new_count: float) -> bool:
        if self.del_exp(user, old_title, old_category, old_hour, old_minute, old_day, old_month, old_year, old_count):
            return self.add_exp(user, new_title, new_category, new_hour, new_minute, new_day, new_month, new_year,
                                new_count)
        else:
            return False

    def all_exp(self, user: str, negative=True):
        try:
            categorised = {
                "Basic": 0,
                "Transport": 0,
                "Household": 0,
                "Health": 0,
                "Leisure & travel": 0,
                "Other": 0
            }
            if not user in self._expenses:
                return categorised
            exp = self._expenses[user]
            exp = exp[exp["count"] <= 0] if negative else exp[exp["count"] >= 0]
            for name, groups in exp.groupby(["category"]):
                for i, row in groups.iterrows():
                    categorised[row["category"]] = categorised[row["category"]] + abs(row["count"])
            return categorised
        except Exception as e:
            print(e)
